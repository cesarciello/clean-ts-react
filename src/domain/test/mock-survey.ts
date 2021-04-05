import faker from 'faker'
import { SurveyModel } from '../models/survey-model'

export const mockSurvey = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent(),
  didAnswer: faker.random.boolean(),
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
  id: faker.random.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.random.boolean(),
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
