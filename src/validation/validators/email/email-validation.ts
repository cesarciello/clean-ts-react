import { InavlidFieldError } from '@/validation/error';
import { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  field: string;

  validate(value: string): Error {
    return new InavlidFieldError('email')
  }
}
