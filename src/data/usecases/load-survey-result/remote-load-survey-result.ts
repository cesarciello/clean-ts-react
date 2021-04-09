import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { RemoteSurveyResult } from '../../models/remote-survey-result'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyResult.Result>
  ) { }

  async load(): Promise<LoadSurveyResult.Result> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return { ...httpResponse.body, date: new Date(httpResponse.body.date) }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Result = RemoteSurveyResult
}
