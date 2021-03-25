import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  httpResponse: HttpResponse<R> = {
    statusCode: HttpStatusCode.success
  }

  async post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Result<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.httpResponse)
  }
}
