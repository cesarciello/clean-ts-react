import { RequiredFieldError } from '@/validation/error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(value: string): Error {
    if (!value) {
      return new RequiredFieldError(this.field)
    }
    return null
  }
}
