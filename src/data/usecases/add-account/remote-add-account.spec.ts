import faker from 'faker'

import { HttpPostClientSpy } from '@/data/test'
import { mockAddAccountParams } from '@/domain/test'
import { RemoteAddAccount } from './remote-add-account'
import { AddAccount } from '@/domain/usecases/add-account'
import { HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, AddAccount.Result>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, AddAccount.Result>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}
describe('RemoteAddAccount', () => {
  test('should call HttpClient with correct url', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('should return AccessToken on sucess', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: {
        accessToken: faker.random.uuid()
      }
    }
    const httpResponse = await sut.add(mockAddAccountParams())
    expect(httpResponse.accessToken).toBeTruthy()
  })

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
