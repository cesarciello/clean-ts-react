import { ValidationBuilder, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidationFactory = (): ValidationComposite => {
  return new ValidationComposite([
    ...ValidationBuilder.field('name').required().min(10).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation').required().compare('password').min(5).build()
  ])
}
