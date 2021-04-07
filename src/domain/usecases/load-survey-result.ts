import { SurveyResultModel } from '../models/survey-result-model'

export interface LoadSurveyResult {
  load: () => Promise<LoadSurveyResult.Result>
}

export namespace LoadSurveyResult {
  export type Result = SurveyResultModel
}
