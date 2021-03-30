import faker from 'faker'
import { HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '../protocols/http/http-get-client'

export const mockPostRequest = (): HttpPostClient.Params => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  httpResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  }

  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.httpResponse)
  }
}

export class HttpGetClientSpy<T> implements HttpGetClient<T> {
  url: string
  httpResponse: HttpGetClient.Result<T> = {
    statusCode: 200
  }

  async get(params: HttpGetClient.Params): Promise<HttpGetClient.Result<T>> {
    this.url = params.url
    return Promise.resolve(this.httpResponse)
  }
}
