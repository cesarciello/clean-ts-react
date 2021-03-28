import { InavlidFieldError } from '@/validation/error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) { }

  validate(input: object): Error {
    console.log({
      input,
      field: this.field,
      fieldToCompare: this.fieldToCompare
    })
    if (input[this.field] !== input[this.fieldToCompare]) {
      return new InavlidFieldError(this.field)
    }
  }
}
