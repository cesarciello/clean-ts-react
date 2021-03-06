import faker from 'faker'

import { EmailValidation } from './email-validation'
import { InavlidFieldError } from '@/validation/error'

const makeSut = (): EmailValidation => new EmailValidation('email')

describe('EmailValidation', () => {
  test('should return error if email as invalid', () => {
    const sut = makeSut()
    const error = sut.validate({ email: faker.random.word() })
    expect(error).toEqual(new InavlidFieldError('email'))
  })

  test('should return falsy on success', () => {
    const sut = makeSut()
    const error = sut.validate({ email: faker.internet.email() })
    expect(error).toBeFalsy()
  })

  test('should return falsy if no email is provided', () => {
    const sut = makeSut()
    const error = sut.validate({ email: '' })
    expect(error).toBeFalsy()
  })
})
