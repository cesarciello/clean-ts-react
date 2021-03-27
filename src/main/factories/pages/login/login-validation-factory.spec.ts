import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeLoginValidationFactory } from './login-validation-factory'

describe('LoginValidationFactory', () => {
  test('should compose Validation Compiste with correct validations', () => {
    const composite = makeLoginValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
