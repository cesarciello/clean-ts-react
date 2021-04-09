import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurveyList.Result[]>
  ) { }

  async loadAll(): Promise<LoadSurveyList.Result> {
    const httpResponse = await this.httpClient.request({ url: this.url, method: 'get' })
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
