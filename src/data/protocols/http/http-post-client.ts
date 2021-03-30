import { HttpResponse } from './http-response'

export interface HttpPostClient<R> {
  post: (params: HttpPostClient.Params) => Promise<HttpPostClient.Result<R>>
}

export namespace HttpPostClient {
  export type Params = {
    url: string
    body?: any
  }

  export type Result<R> = HttpResponse<R>
}
