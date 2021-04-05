import { makeSignUpValidationFactory } from './signup-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  test('should compose Validation with correct validators', () => {
    const composite = makeSignUpValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('name').required().min(10).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().compare('password').min(5).build()
    ]))
  })
})
