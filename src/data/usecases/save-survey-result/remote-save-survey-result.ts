import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { RemoteSurveyResult } from '@/data/models/remote-survey-result'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { SurveyResultModel } from '@/domain/models/survey-result-model'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SaveSurveyResult.Result>
  ) { }

  async save(params: SaveSurveyResult.Params): Promise<SurveyResultModel> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'put',
      url: this.url,
      body: params
    })

    switch (statusCode) {
      case HttpStatusCode.success: return {
        ...body,
        date: new Date(body.date)
      }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteSaveSurveyResult {
  export type Result = RemoteSurveyResult
}
