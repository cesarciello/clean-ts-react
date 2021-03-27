import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'

export const makeRemoteAuthenticatioFactory = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeApiUrlFactory(), makeAxiosHttpClientFactory())
}
