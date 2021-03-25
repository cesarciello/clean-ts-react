import { HttpResponse } from './http-response'

export interface HttpPostClient {
  post(params: HttpPostClient.Params): Promise<HttpPostClient.Result>
}

export namespace HttpPostClient {
  export type Params = {
    url: string
    body?: any
  }

  export type Result = HttpResponse
}
