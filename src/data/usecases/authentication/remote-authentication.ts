import { Authentication } from '@/domain/usecases/authentication'
import { UnexpectedError, InvalidCredentialsError } from '@/domain/errors'
import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<Authentication.Result>
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const httpReponse = await this.httpPostClient.post({
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
