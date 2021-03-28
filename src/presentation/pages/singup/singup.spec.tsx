import faker from 'faker'
import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup } from '@testing-library/react'

import { SingUp } from '..'
import { ValidationSpy, Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const history = createMemoryHistory({ initialEntries: ['/singup'] })

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(
    <Router history={history}>
      <SingUp validation={validationSpy} />
    </Router>
  )
  return {
    sut,
    validationSpy
  }
}

describe('SingUp Page', () => {
  beforeEach(() => cleanup)

  test('should start with correct initial state', () => {
    const { sut: { getByTestId } } = makeSut()
    expect(getByTestId('error-wrap').childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
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
})
