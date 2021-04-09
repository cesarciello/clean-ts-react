import faker from 'faker'

import { HttpClientSpy } from '@/data/test'
import { RemoteSaveSurveyResult } from './remote-save-survey-result'
import { mockRemoteSurveyResult } from '@/domain/test/mock-survey-result'

type SutTypes = {
  sut: RemoteSaveSurveyResult
  httpClientSpy: HttpClientSpy<any>
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
    await sut.save({
      answer: faker.random.words()
    })
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('put')
  })
})
