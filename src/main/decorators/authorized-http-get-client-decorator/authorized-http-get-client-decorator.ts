import { GetStorage } from '@/data/protocols/storage/get-storage'
import { HttpClient } from '@/data/protocols/http'

export class AuthorizedHttpClientDecorator implements HttpClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpClient<any>
  ) { }

  async request(params: HttpClient.Params): Promise<HttpClient.Response<any>> {
    const account = this.getStorage.get('account')
    if (account?.accessToken) {
      params.headers = {
        ...params.headers,
        'x-access-token': account.accessToken
      }
    }
    const httpReponse = await this.httpGetClient.request(params)
    return httpReponse
  }
}
