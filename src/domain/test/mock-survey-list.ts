import { SurveyModel } from '../models/survey-model'
import { mockSurvey } from './mock-survey'

export const mockSurveyList = (): SurveyModel[] => ([
  mockSurvey(),
  mockSurvey(),
  mockSurvey()
])
