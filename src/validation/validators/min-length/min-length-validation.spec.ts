import faker from 'faker'

import { MinLengthValidation } from './min-length-validation'
import { MinLengthError } from '@/validation/error/min-length-error'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.collation(), 1)

describe('MinLengthValidation', () => {
  test('should return error if value is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new MinLengthError(1))
  })
})
