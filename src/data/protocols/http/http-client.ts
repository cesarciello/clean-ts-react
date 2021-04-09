
export interface HttpClient<R> {
  request: (params: HttpClient.Params) => Promise<HttpClient.Response<R>>
}

export namespace HttpClient {
  export type Params = {
    url: string
    method: HttpMethod
    headers?: any
    body?: any
  }

  export type Response<R> = HttpResponse<R>
}

export type HttpMethod = 'get' | 'post' | 'put'

export enum HttpStatusCode {
  success = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<R = any> = {
  statusCode: HttpStatusCode
  body?: R
}
