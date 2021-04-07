import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'
import faker from 'faker'
import { SurveyResultModel } from '../models/survey-result-model'

export const mockSurveyResult = (): SurveyResultModel => ({
  question: faker.random.words(10),
  date: faker.date.recent(),
  answers: [
    {
      answer: faker.random.words(4),
      count: 1,
      percent: 100
    },
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
      count: 0,
      percent: 0
    }
  ]
})

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Result => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  answers: [
    {
      answer: faker.random.words(4),
      count: 1,
      percent: 100
    },
    {
      answer: faker.random.words(4),
      image: faker.internet.url(),
      count: 0,
      percent: 0
    }
  ]
})
