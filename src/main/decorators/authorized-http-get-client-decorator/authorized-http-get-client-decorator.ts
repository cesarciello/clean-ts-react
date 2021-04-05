import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { GetStorage } from '@/data/protocols/storage/get-storage'

export class AuthorizedHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage
  ) { }

  async get(params: HttpGetClient.Params): Promise<HttpGetClient.Result<any>> {
    this.getStorage.get('account')
    return null
  }
}
