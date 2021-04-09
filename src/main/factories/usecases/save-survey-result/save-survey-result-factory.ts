
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators/authorize-http-get-client-decorator'
import { RemoteSaveSurveyResult } from '@/data/usecases/save-survey-result/remote-save-survey-result'

export const makeRemoteSaveSurveyResultFactory = (id: string): RemoteSaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrlFactory(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
