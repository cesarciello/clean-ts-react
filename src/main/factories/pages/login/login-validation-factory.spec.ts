import { makeLoginValidationFactory } from './login-validation-factory'
import { EmailValidation, MinLengthValidation, RequiredFieldValidation, ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('should compose Validation Compiste with correct validations', () => {
    const composite = makeLoginValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLengthValidation('password', 5)
    ]))
  })
})
