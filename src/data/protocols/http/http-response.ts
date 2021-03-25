export enum HttpStatusCode {
  unathorized = 401,
  success = 200,
  badRequest = 400,
  noContent = 204,
  notFound = 404,
  serverError = 500
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
