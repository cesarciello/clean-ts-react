import { RequiredFieldError } from '@/validation/error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(input: object): Error {
    if (!input[this.field]) {
      return new RequiredFieldError(this.field)
    }
  }
}
