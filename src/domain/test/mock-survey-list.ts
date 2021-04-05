import { SurveyModel } from '../models/survey-model'
import { mockRemoteSurvey, mockSurvey } from './mock-survey'

export const mockSurveyList = (): SurveyModel[] => ([
  mockSurvey(),
  mockSurvey(),
  mockSurvey()
])

export const mockRemoteSurveyList = (): any[] => ([
  mockRemoteSurvey(),
  mockRemoteSurvey(),
  mockRemoteSurvey()
])
