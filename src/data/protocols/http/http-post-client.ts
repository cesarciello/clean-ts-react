import { HttpResponse } from './http-response'

export interface HttpPostClient<T, R> {
  post: (params: HttpPostClient.Params<T>) => Promise<HttpPostClient.Result<R>>
}

export namespace HttpPostClient {
  export type Params<T> = {
    url: string
    body?: T
  }

  export type Result<R> = HttpResponse<R>
}
