
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteAddAccountFactory = (): RemoteAddAccount => {
  return new RemoteAddAccount(makeApiUrlFactory('/signup'), makeAxiosHttpClientFactory())
}
