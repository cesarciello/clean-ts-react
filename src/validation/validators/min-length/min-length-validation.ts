import { MinLengthError } from '@/validation/error/min-length-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number
  ) { }

  validate(input: object): Error {
    if (input[this.field]?.length < this.minLength) {
      return new MinLengthError(this.minLength)
    }
  }
}
