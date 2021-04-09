import faker from 'faker'
import { RemoteAuthentication } from './remote-authentication'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { Authentication } from '@/domain/usecases/authentication'
import { mockAccountModel, mockAuthenticationParams } from '@/domain/test'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteAuthentication
  httpClientSpy: HttpClientSpy<Authentication.Result>
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Authentication.Result>()
  const sut = new RemoteAuthentication(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

const url = faker.internet.url()

describe('RemoteAuthentication', () => {
  test('should call HttpClient with correct URL and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('post')
  })

  test('should call HttpClient with correct body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const authParams = mockAuthenticationParams()
    await sut.auth(authParams)
    expect(httpClientSpy.body).toEqual(authParams)
  })

  test('should return account if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockAccountModel()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    }
    const httpResponse = await sut.auth(mockAuthenticationParams())
    expect(httpResponse).toEqual(httpResult)
  })

  test('should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
