import faker from 'faker'

import { HttpClientSpy } from '@/data/test'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'
import { mockRemoteSurveyResult } from '@/domain/test/mock-survey-result'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<any>
}

const answerToSave = {
  answer: faker.random.words()
}
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
  test('should call httpClient with correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.save(answerToSave)
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })

  test('should throws AccessDeniedError if httpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.save(answerToSave)
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throws UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.save(answerToSave)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throws UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.save(answerToSave)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
