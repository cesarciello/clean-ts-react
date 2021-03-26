import { MinLengthError } from '@/validation/error/min-length-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly minLength: number
  ) { }

  validate(value: string): Error {
    if (value.length >= this.minLength) {
      return null
    }
    return new MinLengthError(this.minLength)
  }
}
