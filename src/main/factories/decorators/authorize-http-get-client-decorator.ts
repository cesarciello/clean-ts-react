import { HttpClient } from '@/data/protocols/http'
import { makeAxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'
import { makeLocalStorageAdapterFactory } from '@/main/factories/storage/local-storage-adapter-factory'
import { AuthorizedHttpClientDecorator } from '@/main/decorators/authorized-http-get-client-decorator/authorized-http-get-client-decorator'

export const makeAuthorizeHttpClientDecorator = (): HttpClient<any> => {
  return new AuthorizedHttpClientDecorator(makeLocalStorageAdapterFactory(), makeAxiosHttpClientFactory())
}
