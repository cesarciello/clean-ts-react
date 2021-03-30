import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Result>
  ) { }

  async loadAll(): Promise<LoadSurveyList.Result> {
    await this.httpGetClient.get({ url: this.url })
    return null
  }
}
