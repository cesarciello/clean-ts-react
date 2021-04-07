import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyResult.Result>
  ) { }

  async load(): Promise<LoadSurveyResult.Result> {
    await this.httpGetClient.get({ url: this.url })
    return null
  }
}
