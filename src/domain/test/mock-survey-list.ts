import faker from 'faker'
import { SurveyModel } from '../models/survey-model'

export const mockSurveyList = (): SurveyModel[] => ([{
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
}])
