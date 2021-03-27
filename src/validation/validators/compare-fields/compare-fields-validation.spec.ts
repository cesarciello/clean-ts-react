import { InavlidFieldError } from '@/validation/error'
import faker from 'faker'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (fieldToCompare, valueToCompare: string): CompareFieldsValidation => (new CompareFieldsValidation(fieldToCompare, valueToCompare))
describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const fieldToCompare = faker.database.column()
    const sut = makeSut(fieldToCompare, faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InavlidFieldError(fieldToCompare))
  })

  test('should return null if compare is valid', () => {
    const value = faker.random.word()
    const sut = makeSut(faker.database.column(), value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })
})
