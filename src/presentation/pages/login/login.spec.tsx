import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-model'
import ApiContext from '@/presentation/context/api/api-context'
import { ValidationSpy, AuthenticationSpy, Helper } from '@/presentation/test'

type SutTypes = {
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationSpy} authentication={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

describe('LoginPage', () => {
  test('should start with initial state', () => {
    makeSut()
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton).toBeEnabled()
    expect(screen.getByTestId('password-input-container').children).toHaveLength(1)
    expect(screen.getByTestId('email-input-container').children).toHaveLength(1)
  })

  test('should show email error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_email'
    Helper.populateField('email', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('email-input-container').children).toHaveLength(2)
    expect(screen.getByTestId('email-error')).toHaveTextContent(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    Helper.populateField('password', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('password-input-container').children).toHaveLength(2)
    expect(screen.getByTestId('password-error')).toHaveTextContent(validationSpy.errorMessage)
  })

  test('should show valid password state if Validation succeds', () => {
    makeSut()
    Helper.populateField('password', screen.getByTestId, faker.internet.password())
    expect(screen.getByTestId('password-input-container').children).toHaveLength(1)
  })

  test('should show valid email state if Validation succeds', () => {
    makeSut()
    Helper.populateField('email', screen.getByTestId, faker.internet.email())
    expect(screen.getByTestId('email-input-container').children).toHaveLength(1)
  })

  test('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateListField(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }])
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton).toBeEnabled()
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email', fieldValue: email }, { fieldName: 'password', fieldValue: password }], 'submit')
    expect(authenticationSpy.email).toBe(email)
    expect(authenticationSpy.password).toBe(password)
  })

  test('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should prevent subimit form on invalid params', () => {
    const { authenticationSpy, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    Helper.populateField('email', screen.getByTestId, faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    const errorWrap = screen.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(errorWrap.children).toHaveLength(1)
    expect(errorWrap).toHaveTextContent(error.message)
  })

  test('should navigate to main page on success', async () => {
    makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await waitFor(() => screen.getByTestId('form'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to sigup page', () => {
    makeSut()
    const register = screen.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
