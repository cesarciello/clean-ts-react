import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation, EmailValidation } from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validators = sut.field('any_field').required().build()
    expect(validators).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation', () => {
    const validators = sut.field('any_field').email().build()
    expect(validators).toEqual([new EmailValidation('any_field')])
  })
})
