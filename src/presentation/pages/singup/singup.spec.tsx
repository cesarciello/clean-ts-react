import faker from 'faker'
import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'

import { SingUp } from '..'
import { ValidationSpy, Helper, AddAccountSpy, SaveAccessTokenMock } from '@/presentation/test'
import { EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/singup'] })

const makeSut = (): SutTypes => {
  const saveAccessTokenMock = new SaveAccessTokenMock()
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = render(
    <Router history={history}>
      <SingUp validation={validationSpy} addAccount={addAccountSpy} saveAccessToken={saveAccessTokenMock} />
    </Router>
  )
  return {
    sut,
    validationSpy,
    addAccountSpy,
    saveAccessTokenMock
  }
}

describe('SingUp Page', () => {
  beforeEach(() => cleanup)

  test('should start with correct initial state', () => {
    const { sut: { getByTestId } } = makeSut()
    expect(getByTestId('error-wrap').childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
    expect(getByTestId('name-input-container').childElementCount).toBe(1)
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
    expect(getByTestId('passwordConfirmation-input-container').childElementCount).toBe(1)
  })

  test('should show name error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('name', getByTestId, faker.random.word())
    expect(getByTestId('name-input-container').childElementCount).toBe(2)
    expect(getByTestId('name-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show email error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('email', getByTestId, faker.random.word())
    expect(getByTestId('email-input-container').childElementCount).toBe(2)
    expect(getByTestId('email-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('password', getByTestId, faker.random.word())
    expect(getByTestId('password-input-container').childElementCount).toBe(2)
    expect(getByTestId('password-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const { sut: { getByTestId }, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('passwordConfirmation', getByTestId, faker.random.word())
    expect(getByTestId('passwordConfirmation-input-container').childElementCount).toBe(2)
    expect(getByTestId('passwordConfirmation-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show valid name state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('name', getByTestId, faker.random.word())
    expect(getByTestId('name-input-container').childElementCount).toBe(1)
  })

  test('should show valid email state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('email', getByTestId, faker.random.word())
    expect(getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should show valid password state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('password', getByTestId, faker.random.word())
    expect(getByTestId('password-input-container').childElementCount).toBe(1)
  })

  test('should show valid passwordConfirmation state if Validation succeds', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateField('passwordConfirmation', getByTestId, faker.random.word())
    expect(getByTestId('passwordConfirmation-input-container').childElementCount).toBe(1)
  })

  test('should enable button if form is valid', () => {
    const { sut: { getByTestId } } = makeSut()
    Helper.populateListField(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }])
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    const { sut: { getByTestId } } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(getByTestId('spinner')).toBeTruthy()
  })

  test('should calls AddAccount with correct values', async () => {
    const { sut: { getByTestId }, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name', fieldValue: name }, { fieldName: 'email', fieldValue: email }, { fieldName: 'password', fieldValue: password }, { fieldName: 'passwordConfirmation', fieldValue: password }], 'submit')
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('should calls AddAccount only once', async () => {
    const { sut: { getByTestId }, addAccountSpy } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should prevent subimit form on invalid params', () => {
    const { sut: { getByTestId }, validationSpy, addAccountSpy } = makeSut()
    validationSpy.errorMessage = faker.random.word()
    Helper.populateField('email', getByTestId, faker.internet.email())
    fireEvent.submit(getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { sut: { getByTestId }, addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    const errorWrap = getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(errorWrap.childElementCount).toBe(1)
    expect(getByTestId('errorMessage').textContent).toBe(error.message)
  })

  test('should call SaveAccessToken on success', async () => {
    const { sut: { getByTestId }, addAccountSpy, saveAccessTokenMock } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
  })

  test('should show error message if SaveAccessToken fails', async () => {
    const { sut: { getByTestId }, saveAccessTokenMock } = makeSut()
    const error = new Error('any_message')
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    const errorWrap = getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(errorWrap.childElementCount).toBe(1)
    expect(getByTestId('errorMessage').textContent).toBe(error.message)
  })

  test('should show error message if SaveAccessToken fails', async () => {
    const { sut: { getByTestId }, saveAccessTokenMock } = makeSut()
    const error = new Error('any_message')
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    const errorWrap = getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(errorWrap.childElementCount).toBe(1)
    expect(getByTestId('errorMessage').textContent).toBe(error.message)
  })

  test('should navigate to main page on success', async () => {
    const { sut: { getByTestId } } = makeSut()
    await Helper.simulateValidSubmit(getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await waitFor(() => getByTestId('form'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page with click link', async () => {
    const { sut: { getByTestId } } = makeSut()
    fireEvent.click(getByTestId('login'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
