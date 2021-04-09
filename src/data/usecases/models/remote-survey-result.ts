export type RemoteSurveyResult = {
  id: string
  question: string
  answers: SurveyResultAnswers[]
  date: string
}

interface SurveyResultAnswers {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswer: boolean
}
