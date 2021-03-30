import { HttpResponse } from './http-response'

export interface HttpGetClient<R> {
  get: (params: HttpGetClient.Params) => Promise<HttpGetClient.Result<R>>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
  }

  export type Result<R> = HttpResponse<R>
}
