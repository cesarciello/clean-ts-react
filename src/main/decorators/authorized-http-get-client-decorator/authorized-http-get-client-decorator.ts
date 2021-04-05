import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { GetStorage } from '@/data/protocols/storage/get-storage'

export class AuthorizedHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<any>
  ) { }

  async get(params: HttpGetClient.Params): Promise<HttpGetClient.Result<any>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        'x-access-token': account.accessToken
      }
    }
    const httpReponse = await this.httpGetClient.get(params)
    return httpReponse
  }
}
