import { HttpClient } from '@/data/protocols/http'
import { SurveyResultModel } from '@/domain/models/survey-result-model'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { RemoteSurveyResult } from '../../models/remote-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<any>
  ) { }

  async save(params: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })
    return null
  }
}

export namespace RemoteSaveSurveyResult {
  export type Result = RemoteSurveyResult
}
