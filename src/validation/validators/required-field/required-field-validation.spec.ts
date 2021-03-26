import faker from 'faker'

import { RequiredFieldError } from '@/validation/error'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field')

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError('field'))
  })

  test('should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toBeFalsy()
  })
})
