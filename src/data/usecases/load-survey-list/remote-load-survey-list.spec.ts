import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test/mock-http'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpStatusCode } from '@/data/protocols/http'

type SutTypes = {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<any>
}

const url = faker.internet.url()

const makeSut = (): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<any>()
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
    expect(promise).rejects.toThrow()
  })
})
