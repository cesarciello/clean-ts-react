import { InavlidFieldError } from '@/validation/error'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (field, fieldToCompare: string): CompareFieldsValidation => (new CompareFieldsValidation(field, fieldToCompare))
describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(3),
      [fieldToCompare]: faker.random.words(4)
    })
    expect(error).toEqual(new InavlidFieldError(field))
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
