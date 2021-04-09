import faker from 'faker'
import { HttpClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export const mockHttpRequest = (): HttpClient.Params => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put']),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement()
})

export const mockPostRequest = (): HttpClient.Params => ({
  method: 'post',
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpClient.Params => ({
  method: 'get',
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})

export class HttpClientSpy<R> implements HttpClient<R> {
  url: string
  body?: any
  method: string
  headers?: any
  httpResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  }

  async request(params: HttpClient.Params): Promise<HttpClient.Response<R>> {
    this.method = params.method
    this.url = params.url
    this.body = params.body
    this.headers = params.headers
    return Promise.resolve(this.httpResponse)
  }
}
