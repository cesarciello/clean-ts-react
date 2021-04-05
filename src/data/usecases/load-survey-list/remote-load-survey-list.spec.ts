import faker from 'faker'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClientSpy } from '@/data/test/mock-http'
import { mockRemoteSurveyList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Result[]>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Result[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('should call HttpGetClient with correct url', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should throws UnexpectedError on 400', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should throws UnexpectedError on 403', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should throws UnexpectedError on 500', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should throws UnexpectedError on 404', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.loadAll()
    await expect(promise).rejects.toThrow()
  })

  test('should return a list surveys on 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResult = mockRemoteSurveyList()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.success,
      body: httpResult
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual(httpResult)
  })

  test('should return a list surveys on 204', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.httpResponse = {
      statusCode: HttpStatusCode.noContent
    }
    const surveyList = await sut.loadAll()
    expect(surveyList).toEqual([])
  })
})
