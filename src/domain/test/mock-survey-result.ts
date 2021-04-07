import faker from 'faker'

import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import { SurveyResultModel } from '../models/survey-result-model'
import { LoadSurveyResult } from '../usecases/load-survey-result'

export const mockSurveyResult = (): SurveyResultModel => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      answer: faker.random.words(4),
      count: 1,
      percent: 100,
      isCurrentAccountAnswer: true
    },
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
      count: 0,
      percent: 0,
      isCurrentAccountAnswer: false
    }
  ]
})

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Result => ({
  ...mockSurveyResult(),
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString()
})

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0
  surveyResult = mockSurveyResult()
  async load(): Promise<LoadSurveyResult.Result> {
    this.callsCount++
    return this.surveyResult
  }
}
