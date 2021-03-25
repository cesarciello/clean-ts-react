import { HttpPostClient } from 'data/protocols/remote/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post(params: HttpPostClient.Params): Promise<void> {
    this.url = params.url
    return Promise.resolve()
  }
}
