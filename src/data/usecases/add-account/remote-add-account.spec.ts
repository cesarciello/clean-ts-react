import faker from 'faker'

import { RemoteAddAccount } from './remote-add-account'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAddAccountParams } from '@/domain/test'
import { AddAccount } from '@/domain/usecases/add-account'
import { InvalidCredentialsError, UnexpectedError, EmailInUseError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpClientSpy: HttpClientSpy<AddAccount.Result>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<AddAccount.Result>()
  const sut = new RemoteAddAccount(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}
describe('RemoteAddAccount', () => {
  test('should call HttpClient with correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('should call HttpClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpClientSpy.body).toEqual(addAccountParams)
  })

  test('should return Account on sucess', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      }
    }
    const httpResponse = await sut.add(mockAddAccountParams())
    expect(httpResponse).toBeTruthy()
  })

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
