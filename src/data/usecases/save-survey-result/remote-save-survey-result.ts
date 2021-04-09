import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyResultModel } from '@/domain/models/survey-result-model'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { RemoteSurveyResult } from '../../models/remote-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<any>
  ) { }

  async save(params: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    const httpResponse = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Result = RemoteSurveyResult
}
