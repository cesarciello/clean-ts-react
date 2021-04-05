
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClientFactory } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadSurveyListFactory = (): RemoteLoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrlFactory('/surveys'), makeAxiosHttpClientFactory())
}
