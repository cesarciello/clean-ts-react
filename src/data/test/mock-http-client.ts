import { HttpPostClient } from 'data/protocols/remote/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post(url: string): Promise<void> {
    this.url = url
    return Promise.resolve()
  }
}
