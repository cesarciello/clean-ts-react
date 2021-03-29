export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswers[]
  date: string
  didAnswer: boolean
}

interface SurveyAnswers {
  image?: string
  answer: string
}
