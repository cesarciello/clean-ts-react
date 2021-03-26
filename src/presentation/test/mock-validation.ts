import { Validation } from '../protocols/validation'

export class ValidationSpy implements Validation {
  fieldName: string
  fieldValue: string
  errorMessage: string

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}
