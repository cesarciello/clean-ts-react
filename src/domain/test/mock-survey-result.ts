import faker from 'faker'

import { RemoteLoadSurveyResult } from '@/data/usecases/load-survey-result/remote-load-survey-result'

export const mockRemoteSurveyResult = (): RemoteLoadSurveyResult.Result => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(10),
  date: faker.date.recent().toISOString(),
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
