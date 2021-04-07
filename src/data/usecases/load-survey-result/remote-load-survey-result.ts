import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyResult.Result>
  ) { }

  async load(): Promise<LoadSurveyResult.Result> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return null
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}
