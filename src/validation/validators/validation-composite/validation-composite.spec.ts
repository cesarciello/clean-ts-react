import faker from 'faker'

import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy
  fieldValidationSpy2: FieldValidationSpy
}

const makeSut = (): SutTypes => {
  const fieldValidationSpy = new FieldValidationSpy('any_field')
  const fieldValidationSpy2 = new FieldValidationSpy('any_field')
  const sut = new ValidationComposite([
    fieldValidationSpy,
    fieldValidationSpy2
  ])
  return {
    sut,
    fieldValidationSpy,
    fieldValidationSpy2
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const { sut, fieldValidationSpy2 } = makeSut()
    fieldValidationSpy2.error = new Error('any_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toEqual(new Error('any_message').message)
  })
})
