import { mockSurveyList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0
  surveyList = mockSurveyList()
  async loadAll(): Promise<LoadSurveyList.Result> {
    this.callsCount++
    return this.surveyList
  }
}
