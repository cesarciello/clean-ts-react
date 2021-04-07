import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Result>
  ) { }

  async load(): Promise<LoadSurveyResult.Result> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.success: return { ...httpResponse.body, date: new Date(httpResponse.body.date) }
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Result = {
    id: string
    question: string
    answers: SurveyResultAnswers[]
    date: string
  }

  interface SurveyResultAnswers {
    image?: string
    answer: string
    count: number
    percent: number
    isCurrentAccountAnswer: boolean
  }

}
