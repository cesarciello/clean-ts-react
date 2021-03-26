import faker from 'faker'

import { EmailValidation } from './email-validation'
import { InavlidFieldError } from '@/validation/error'

const makeSut = (): EmailValidation => new EmailValidation()

describe('EmailValidation', () => {
  test('should return error if email as invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InavlidFieldError('email'))
  })

  test('should return falsy on success', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})