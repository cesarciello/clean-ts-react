import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Result[]>
  ) { }

  async loadAll(): Promise<LoadSurveyList.Result> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    const remoteSurvey = httpResponse.body || []
    switch (httpResponse.statusCode) {
      case (HttpStatusCode.success): return remoteSurvey.map(remoteSurvey => Object.assign(remoteSurvey, { date: new Date(remoteSurvey.date) }))
      case (HttpStatusCode.noContent): return []
      case (HttpStatusCode.forbidden): throw new AccessDeniedError()
      default: throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Result = {
    id: string
    question: string
    answers: SurveyAnswers[]
    date: string
    didAnswer: boolean
  }

  interface SurveyAnswers {
    image?: string
    answer: string
  }

}
