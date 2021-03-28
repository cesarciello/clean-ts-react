import faker from 'faker'

import { MinLengthValidation } from './min-length-validation'
import { MinLengthError } from '@/validation/error/min-length-error'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 1)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new MinLengthError(1))
  })

  test('should return falsy if no field in input', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })

  test('should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(2) })
    expect(error).toBeFalsy()
  })
})
