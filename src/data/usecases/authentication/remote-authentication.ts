import { Authentication } from '@/domain/usecases/authentication'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpClient<Authentication.Result>
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const httpReponse = await this.httpPostClient.request({
      method: 'post',
      url: this.url,
      body: params
    })
    switch (httpReponse.statusCode) {
      case HttpStatusCode.success: return {
        accessToken: httpReponse.body?.accessToken ?? '',
        name: httpReponse.body?.name ?? ''
      }
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
