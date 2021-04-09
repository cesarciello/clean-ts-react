
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list'
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators/authorize-http-get-client-decorator'

export const makeRemoteLoadSurveyListFactory = (): RemoteLoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrlFactory('/surveys'), makeAuthorizeHttpClientDecorator())
}
