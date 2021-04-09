import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpClientSpy } from '@/data/test/mock-http'
import { mockRemoteSurveyList } from '@/domain/test'
import { AccessDeniedError } from '@/domain/errors'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpClientSpy: HttpClientSpy<RemoteLoadSurveyList.Result[]>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteLoadSurveyList.Result[]>()
  const sut = new RemoteLoadSurveyList(url, httpClientSpy)
  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('should call HttpClient with correct url and method', async () => {
    const { sut, httpClientSpy } = makeSut()
    await sut.loadAll()
    expect(httpClientSpy.url).toBe(url)
    expect(httpClientSpy.method).toBe('get')
  })

  test('should throws UnexpectedError on 400', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should throws AccessDeniedError on 403', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('should throws UnexpectedError on 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should throws UnexpectedError on 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should return a list surveys on 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyList()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult)
  })

  test('should return a list surveys on 204', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.httpResponse = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
