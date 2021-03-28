import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  fieldName: string
  input: object
  errorMessage: string

  validate(fieldName: string, input: object): string {
    this.fieldName = fieldName
    this.input = input
    return this.errorMessage
  }
}
