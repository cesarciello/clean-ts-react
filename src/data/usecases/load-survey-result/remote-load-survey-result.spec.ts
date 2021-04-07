import faker from 'faker'

import { HttpGetClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteLoadSurveyResult } from './remote-load-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockRemoteSurveyResult } from '@/domain/test/mock-survey-result'

type SutTypes = {
  sut: RemoteLoadSurveyResult
  httpGetClientSpy: HttpGetClientSpy<any>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any>()
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy)
  httpGetClientSpy.httpResponse.body = mockRemoteSurveyResult()
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyResult', () => {
  test('should call httpGetClient with correct url', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    await sut.load()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throws AccessDeniedError if httpGetClient returns 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throws UnexpectedError if httpGetClient returns 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throws UnexpectedError if httpGetClient returns 400', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.load()
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return SurveyResult if httpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpReponseBody = mockRemoteSurveyResult()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpReponseBody
    }
    const surveyResult = await sut.load()
    expect(surveyResult).toEqual({ ...httpReponseBody, date: new Date(httpReponseBody.date) })
  })
})
