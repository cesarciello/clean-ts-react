export interface SurveyResultModel {
  question: string
  date: Date
  answers: SurveyRsultAnswer[]
}

interface SurveyRsultAnswer {
  image?: string
  answer: string
  count: number
  percent: number
}
