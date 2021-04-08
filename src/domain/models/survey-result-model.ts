export interface SurveyResultModel {
  question: string
  date: Date
  answers: SurveyResultAnswer[]
}

export interface SurveyResultAnswer {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
