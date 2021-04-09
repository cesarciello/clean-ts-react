import faker from 'faker'

import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockRemoteSurveyResult } from '@/domain/test/mock-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpClientSpy: HttpClientSpy<any>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<any>()
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy)
  httpClientSpy.httpResponse.body = mockRemoteSurveyResult()
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call httpClient with correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.load()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('should throws AccessDeniedError if httpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throws UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throws UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return SurveyResult if httpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpReponseBody = mockRemoteSurveyResult()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpReponseBody
    }
    const surveyResult = await sut.load()
    expect(surveyResult).toEqual({ ...httpReponseBody, date: new Date(httpReponseBody.date) })
  })
})
