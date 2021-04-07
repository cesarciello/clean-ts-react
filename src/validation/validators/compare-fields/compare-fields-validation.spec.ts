import faker from 'faker'

import { InavlidFieldError } from '@/validation/error'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field, fieldToCompare: string): CompareFieldsValidation => (new CompareFieldsValidation(field, fieldToCompare))
describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut('field', 'fieldToCompare')
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'other_value'
    })
    expect(error).toEqual(new InavlidFieldError('field'))
  })

  test('should return null if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
