import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationSpy } from '@/presentation/test'
import { AccountModel } from '@/domain/models/account-model'
import { Authentication } from '@/domain/usecases/authentication'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

class AuthenticationSpy implements Authentication {
  email: string
  password: string

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.email = params.email
    this.password = params.password
    return Promise.resolve({
      accessToken: ''
    })
  }
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)
  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Name of the group', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const { sut: { getByTestId } } = makeSut()
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should show email error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    const emailInput = getByTestId('email')
    validationSpy.errorMessage = 'error_email'
    fireEvent.input(emailInput, { target: { value: faker.random.word() } })
    const emailError = getByTestId('email-error')
    expect(getByTestId('email-input-container').childElementCount).toBe(2)
    expect(emailError.textContent).toBe(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = 'error_password'
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.random.word() } })
    const passwordError = getByTestId('password-error')
    expect(getByTestId('password-input-container').childElementCount).toBe(2)
    expect(passwordError.textContent).toBe(validationSpy.errorMessage)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should enable submit button if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', () => {
    const { sut: { getByTestId } } = makeSut()
    fireEvent.input(getByTestId('email'), { target: { value: faker.internet.email() } })
    fireEvent.input(getByTestId('password'), { target: { value: faker.internet.password() } })
    fireEvent.click(getByTestId('submit'))
    expect(getByTestId('spinner')).toBeTruthy()
  })

  test('should call Authentication with correct values', () => {
    const { sut: { getByTestId }, authenticationSpy } = makeSut()
    const emailValue = faker.internet.email()
    const passwordValue = faker.internet.password()
    fireEvent.input(getByTestId('email'), { target: { value: emailValue } })
    fireEvent.input(getByTestId('password'), { target: { value: passwordValue } })
    fireEvent.click(getByTestId('submit'))
    expect(authenticationSpy.email).toBe(emailValue)
    expect(authenticationSpy.password).toBe(passwordValue)
  })
})
