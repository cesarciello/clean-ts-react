import { HttpPostClient } from '@/data/protocols/http'
import { AddAccount } from '@/domain/usecases/add-account'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Params, AddAccount.Result>
  ) { }

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.httpClient.post({
      url: this.url,
      body: params
    })
    return null
  }
}
