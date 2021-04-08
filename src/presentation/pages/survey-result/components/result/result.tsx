import React from 'react'
import FlipMove from 'react-flip-move'

import Styles from './result-styles.scss'
import { Calendar } from '@/presentation/components'
import { useHistory } from 'react-router'
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
        {
          surveyResult.answers.map(answer => (
            <li key={answer.answer} data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''} >
              {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
              <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
              <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
            </li>
          ))
        }
      </FlipMove>
      <button data-testid="back-button" onClick={goBack}>back</button>
    </div>
  )
}

export default Result
