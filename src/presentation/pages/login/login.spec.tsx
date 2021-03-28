import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'

import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'
import { ValidationSpy, AuthenticationSpy, SaveAccessTokenMock, Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )
  return {
    sut,
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock
  }
}

describe('LoginPage', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut: { getByTestId } } = makeSut()
    expect(getByTestId('error-wrap').childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should show email error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_email'
    Helper.populateField('email', getByTestId, faker.random.word())
    expect(getByTestId('email-input-container').childElementCount).toBe(2)
    expect(getByTestId('email-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    Helper.populateField('password', getByTestId, faker.random.word())
    expect(getByTestId('password-input-container').childElementCount).toBe(2)
    expect(getByTestId('password-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('password', getByTestId, faker.internet.password())
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('email', getByTestId, faker.internet.email())
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should enable submit button if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateListField(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }])
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    const { sut: { getByTestId } } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    expect(getByTestId('spinner')).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email', fieldValue: email }, { fieldName: 'password', fieldValue: password }], 'submit')
    expect(authenticationSpy.email).toBe(email)
    expect(authenticationSpy.password).toBe(password)
  })

  test('should call Authentication only once', async () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should prevent subimit form on invalid params', () => {
    const { sut: { getByTestId }, authenticationSpy, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    Helper.populateField('email', getByTestId, faker.internet.email())
    fireEvent.submit(getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    const errorWarp = getByTestId('error-wrap')
    await waitFor(() => errorWarp)
    expect(errorWarp.childElementCount).toBe(1)
    expect(errorWarp.textContent).toBe(error.message)
  })

  test('should call SaveAccessToken with correct values', async () => {
    const { sut: { getByTestId }, authenticationSpy, saveAccessTokenMock } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    saveAccessTokenMock.accessToken = authenticationSpy.account.accessToken
    await waitFor(() => getByTestId('form'))
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
  })

  test('should present error if SaveAccessToken fails', async () => {
    const { sut: { getByTestId }, saveAccessTokenMock } = makeSut()
    const error = new Error('any_message')
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    const errorWarp = getByTestId('error-wrap')
    await waitFor(() => errorWarp)
    expect(errorWarp.childElementCount).toBe(1)
    expect(errorWarp.textContent).toBe(error.message)
  })

  test('should navigate to main page on success', async () => {
    const { sut: { getByTestId } } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await waitFor(() => getByTestId('form'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to sigup page', () => {
    const { sut: { getByTestId } } = makeSut()
    const register = getByTestId('singup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/singup')
  })
})
