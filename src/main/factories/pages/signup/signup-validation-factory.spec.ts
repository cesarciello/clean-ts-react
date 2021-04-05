import { makeSignUpValidationFactory } from './signup-validation-factory'
import { CompareFieldsValidation, EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('should compose Validation with correct validators', () => {
    const composite = makeSignUpValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      new RequiredFieldValidation('name'),
      new MinLengthValidation('name', 10),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password'),
      new MinLengthValidation('passwordConfirmation', 5)
    ]))
  })
})
