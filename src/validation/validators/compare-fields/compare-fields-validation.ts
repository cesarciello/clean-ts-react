import { InavlidFieldError } from '@/validation/error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate(input: object): Error {
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InavlidFieldError(this.fieldToCompare)
    }
  }
}
