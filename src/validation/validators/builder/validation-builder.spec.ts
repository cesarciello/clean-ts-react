import faker from 'faker'

import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation, EmailValidation, MinLengthValidation, CompareFieldsValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validators = sut.field(field).required().build()
    expect(validators).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation', () => {
    const field = faker.database.column()
    const validators = sut.field(field).email().build()
    expect(validators).toEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation', () => {
    const minLength = faker.random.number()
    const field = faker.database.column()
    const validators = sut.field(field).min(minLength).build()
    expect(validators).toEqual([new MinLengthValidation(field, minLength)])
  })

  test('should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validators = sut.field(field).compare(fieldToCompare).build()
    expect(validators).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  test('should return list of validators', () => {
    const minLength = faker.random.number()
    const field = faker.database.column()
    const validators = sut.field(field).email().min(minLength).required().build()
    expect(validators).toEqual([
      new EmailValidation(field),
      new MinLengthValidation(field, minLength),
      new RequiredFieldValidation(field)
    ])
  })
})
