import { InavlidFieldError } from '@/validation/error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) { }

  validate(value: string): Error {
    if (value !== this.valueToCompare) {
      return new InavlidFieldError(this.field)
    }
  }
}
