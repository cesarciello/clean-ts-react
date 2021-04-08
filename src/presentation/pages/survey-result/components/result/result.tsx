import React from 'react'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router'

import Answer from '../answer/answer'
import Styles from './result-styles.scss'
import { Calendar } from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'

type Props = {
  surveyResult: LoadSurveyResult.Result
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()

  return (
    <div className={Styles.resultWrap}>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWarp} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answerList}>
        <>
          {surveyResult.answers.map(answer => (<Answer key={answer.answer} answer={answer} />))}
        </>
      </FlipMove>
      <button data-testid="back-button" onClick={goBack}>back</button>
    </div>
  )
}

export default Result
