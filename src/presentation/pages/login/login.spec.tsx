import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import faker from 'faker'
import 'jest-localstorage-mock'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'

import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'
import { ValidationSpy, AuthenticationSpy } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  )
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const populateField = (fieldName: string, getByTestId: Function, value: string): boolean => fireEvent.input(getByTestId(fieldName), { target: { value } })

const simulateValidSubmit = (getByTestId: Function, email: string, password: string): void => {
  populateField('email', getByTestId, email)
  populateField('password', getByTestId, password)
  fireEvent.click(getByTestId('submit'))
}

describe('Name of the group', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

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
    populateField('email', getByTestId, faker.random.word())
    expect(getByTestId('email-input-container').childElementCount).toBe(2)
    expect(getByTestId('email-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    populateField('password', getByTestId, faker.random.word())
    expect(getByTestId('password-input-container').childElementCount).toBe(2)
    expect(getByTestId('password-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    populateField('password', getByTestId, faker.internet.password())
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    populateField('email', getByTestId, faker.internet.email())
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should enable submit button if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()
    populateField('email', getByTestId, faker.internet.email())
    populateField('password', getByTestId, faker.internet.password())
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut: { getByTestId } } = makeSut()
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
    expect(getByTestId('spinner')).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(getByTestId, email, password)
    expect(authenticationSpy.email).toBe(email)
    expect(authenticationSpy.password).toBe(password)
  })

  test('should call Authentication only once', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should prevent subimit form on invalid params', () => {
    const { sut: { getByTestId }, authenticationSpy, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    populateField('email', getByTestId, faker.internet.email())
    fireEvent.submit(getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
    const errorWarp = getByTestId('error-wrap')
    await waitFor(() => errorWarp)
    expect(errorWarp.childElementCount).toBe(1)
    expect(getByTestId('errorMessage').textContent).toBe(error.message)
  })

  test('should add access token to localstorage on success', async () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
    await waitFor(() => getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })

  test('should navigate to main page on success', async () => {
    const { sut: { getByTestId } } = makeSut()
    simulateValidSubmit(getByTestId, faker.internet.email(), faker.internet.password())
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
