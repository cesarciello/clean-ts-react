import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import { mockAccountModel, mockAuthenticationParams } from '@/domain/test'
import { RemoteAuthentication } from './remote-authentication'
import faker from 'faker'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'
import { HttpStatusCode } from '@/data/protocols/http/http-response'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { Authentication } from '@/domain/usecases/authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, Authentication.Result>
}

const makeSut = (): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, Authentication.Result>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

const url = faker.internet.url()

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authParams = mockAuthenticationParams()
    await sut.auth(authParams)
    expect(httpPostClientSpy.body).toEqual(authParams)
  })

  test('should return account if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    }
    const httpResponse = await sut.auth(mockAuthenticationParams())
    expect(httpResponse).toEqual(httpResult)
  })

  test('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.unathorized
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
