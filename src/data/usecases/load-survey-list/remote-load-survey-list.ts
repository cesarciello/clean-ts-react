import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Result>
  ) { }

  async loadAll(): Promise<LoadSurveyList.Result> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case (HttpStatusCode.success): return null
      default: throw new UnexpectedError()
    }
  }
}
