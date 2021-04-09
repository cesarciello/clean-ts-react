import faker from 'faker'

import { RemoteSaveSurveyResult } from './remote-save-survey-result'
import { HttpClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockRemoteSurveyResult } from '@/domain/test/mock-survey-result'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<any>
}

const mockAddSaveSurveyResult = (): SaveSurveyResult.Params => ({
  answer: faker.random.words()
})
const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<any>()
  const sut = new RemoteSaveSurveyResult(url, httpClientSpy)
  httpClientSpy.httpResponse.body = mockRemoteSurveyResult()
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteSaveSurveyResult', () => {
  test('should call httpClient with correct url, method and body', async () => {
    const { sut, httpClientSpy } = makeSut()
    const paramsAddSurveyResult = mockAddSaveSurveyResult()
    await sut.save(paramsAddSurveyResult)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
    expect(httpClientSpy.body).toEqual(paramsAddSurveyResult)
  })

  test('should throws AccessDeniedError if httpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(mockAddSaveSurveyResult())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throws UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(mockAddSaveSurveyResult())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throws UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.save(mockAddSaveSurveyResult())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return SurveyResult if httpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpReponseBody = mockRemoteSurveyResult()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpReponseBody
    }
    const savedSurveyResult = await sut.save(mockAddSaveSurveyResult())
    expect(savedSurveyResult).toEqual({ ...httpReponseBody, date: new Date(httpReponseBody.date) })
  })
})
