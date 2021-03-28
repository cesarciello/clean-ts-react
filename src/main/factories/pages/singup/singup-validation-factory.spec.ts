import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeSingUpValidationFactory } from './singup-validation-factory'

describe('SingUpValidationFactory', () => {
  test('should compose Validation with correct validators', () => {
    const composite = makeSingUpValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('name').required().min(10).build(),
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build(),
      ...ValidationBuilder.field('passwordConfirmation').required().compare('password').min(5).build()
    ]))
  })
})
