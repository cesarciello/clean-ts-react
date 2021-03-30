export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswers[]
  date: Date
  didAnswer: boolean
}

interface SurveyAnswers {
  image?: string
  answer: string
}
