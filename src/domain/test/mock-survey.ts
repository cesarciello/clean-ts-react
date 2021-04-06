import faker from 'faker'
import { SurveyModel } from '../models/survey-model'

export const mockSurvey = (): SurveyModel => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
  answers: [
    {
      answer: faker.random.words(4)
    },
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    }
  ]
})

export const mockRemoteSurvey = (): any => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
  answers: [
    {
      answer: faker.random.words(4)
    },
    {
      answer: faker.random.words(4),
      image: faker.internet.url()
    }
  ]
})
