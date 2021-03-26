import { EmailValidation } from './email-validation'
import { InavlidFieldError } from '@/validation/error'

const makeSut = (): EmailValidation => new EmailValidation()

describe('EmailValidation', () => {
  test('should return error if email as invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InavlidFieldError('email'))
  })
})
