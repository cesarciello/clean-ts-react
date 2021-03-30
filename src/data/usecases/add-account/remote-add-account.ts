import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError, EmailInUseError } from '@/domain/errors'
import { AddAccount } from '@/domain/usecases/add-account'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Result>
  ) { }

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
