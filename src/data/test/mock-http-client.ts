import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: any
  httpResponse: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.httpResponse)
  }
}
