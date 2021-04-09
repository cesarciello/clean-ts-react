
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators/authorize-http-get-client-decorator'
import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const makeRemoteLoadSurveyResultFactory = (id: string): RemoteLoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrlFactory(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
