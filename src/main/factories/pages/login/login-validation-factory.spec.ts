import { makeLoginValidationFactory } from './login-validation-factory'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

describe('LoginValidationFactory', () => {
  test('should compose Validation Compiste with correct validations', () => {
    const composite = makeLoginValidationFactory()
    expect(composite).toEqual(new ValidationComposite([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().min(5).build()
    ]))
  })
})
