export enum HttpStatusCode {
  unathorized = 401,
  success = 200,
  noContent = 204
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
