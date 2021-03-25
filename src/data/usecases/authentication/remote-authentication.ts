import { HttpPostClient } from '../../protocols/remote/http-post-client'
import { Authentication } from '../../../domain/usecases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    return Promise.resolve({
      accessToken: 'any_token'
    })
  }
}
