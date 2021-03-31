import faker from 'faker'
import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import { SignUp } from '..'
import { EmailInUseError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-model'
import ApiContext from '@/presentation/context/api/api-context'
import { ValidationSpy, Helper, AddAccountSpy } from '@/presentation/test'

type SutTypes = {
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationSpy} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    validationSpy,
    addAccountSpy,
    setCurrentAccountMock
  }
}

describe('SignUp Page', () => {
  test('should start with correct initial state', () => {
    makeSut()
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0)
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
    expect(screen.getByTestId('name-input-container').childElementCount).toBe(1)
    expect(screen.getByTestId('email-input-container').childElementCount).toBe(1)
    expect(screen.getByTestId('password-input-container').childElementCount).toBe(1)
    expect(screen.getByTestId('passwordConfirmation-input-container').childElementCount).toBe(1)
  })

  test('should show name error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('name', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('name-input-container').childElementCount).toBe(2)
    expect(screen.getByTestId('name-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show email error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('email', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('email-input-container').childElementCount).toBe(2)
    expect(screen.getByTestId('email-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show password error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('password', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('password-input-container').childElementCount).toBe(2)
    expect(screen.getByTestId('password-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show passwordConfirmation error if validation fails', () => {
    const { validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    Helper.populateField('passwordConfirmation', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('passwordConfirmation-input-container').childElementCount).toBe(2)
    expect(screen.getByTestId('passwordConfirmation-error').textContent).toBe(validationSpy.errorMessage)
  })

  test('should show valid name state if Validation succeds', () => {
    makeSut()
    Helper.populateField('name', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('name-input-container').childElementCount).toBe(1)
  })

  test('should show valid email state if Validation succeds', () => {
    makeSut()
    Helper.populateField('email', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('email-input-container').childElementCount).toBe(1)
  })

  test('should show valid password state if Validation succeds', () => {
    makeSut()
    Helper.populateField('password', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('password-input-container').childElementCount).toBe(1)
  })

  test('should show valid passwordConfirmation state if Validation succeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation', screen.getByTestId, faker.random.word())
    expect(screen.getByTestId('passwordConfirmation-input-container').childElementCount).toBe(1)
  })

  test('should enable button if form is valid', () => {
    makeSut()
    Helper.populateListField(screen.getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }])
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  test('should calls AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'name', fieldValue: name }, { fieldName: 'email', fieldValue: email }, { fieldName: 'password', fieldValue: password }, { fieldName: 'passwordConfirmation', fieldValue: password }], 'submit')
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('should calls AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('should prevent subimit form on invalid params', () => {
    const { validationSpy, addAccountSpy } = makeSut()
    validationSpy.errorMessage = faker.random.word()
    Helper.populateField('email', screen.getByTestId, faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    const errorWrap = screen.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    expect(errorWrap.childElementCount).toBe(1)
    expect(screen.getByTestId('errorMessage').textContent).toBe(error.message)
  })

  test('should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'name' }, { fieldName: 'email' }, { fieldName: 'password' }, { fieldName: 'passwordConfirmation' }], 'submit')
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
  })

  test('should navigate to main page on success', async () => {
    makeSut()
    await Helper.simulateValidSubmit(screen.getByTestId, [{ fieldName: 'email' }, { fieldName: 'password' }], 'submit')
    await waitFor(() => screen.getByTestId('form'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('should go to login page with click link', async () => {
    makeSut()
    fireEvent.click(screen.getByTestId('login'))
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
