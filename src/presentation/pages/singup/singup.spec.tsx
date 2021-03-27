import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup } from '@testing-library/react'

import { SingUp } from '..'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/singup'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router history={history}>
      <SingUp />
    </Router>
  )
  return {
    sut
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
})
