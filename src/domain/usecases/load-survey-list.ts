import { SurveyModel } from '../models/survey-model'

export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Result>
}

export namespace LoadSurveyList {
  export type Result = SurveyModel[]
}
