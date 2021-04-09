import { SurveyResultModel } from '../models/survey-result-model'

export interface SaveSurveyResult {
  save: (params: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}

export namespace SaveSurveyResult {
  export type Params = {
    answer: string
  }
  export type Result = SurveyResultModel
}
