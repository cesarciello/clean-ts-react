import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { makeLocalStorageAdapterFactory } from '../storage/local-storage-adapter-factory'
import { makeAxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'
import { AuthorizedHttpGetClientDecorator } from '@/main/decorators/authorized-http-get-client-decorator/authorized-http-get-client-decorator'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient<any> => {
  return new AuthorizedHttpGetClientDecorator(makeLocalStorageAdapterFactory(), makeAxiosHttpClientFactory())
}
