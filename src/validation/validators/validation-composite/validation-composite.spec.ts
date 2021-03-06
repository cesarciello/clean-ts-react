import faker from 'faker'

import { FieldValidationSpy } from '@/validation/test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]
  const sut = new ValidationComposite(fieldValidationsSpy)
  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const field = faker.database.column()
    const errorMessage = faker.random.words()
    const { sut, fieldValidationsSpy } = makeSut(field)
    fieldValidationsSpy[0].error = new Error(errorMessage)
    fieldValidationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toEqual(new Error(errorMessage).message)
  })

  test('should return error if any validation fails', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
