import React from 'react'

import Styles from './answer-styles.scss'
import { SurveyResultAnswer } from '@/domain/models/survey-result-model'

type Props = {
  answer: SurveyResultAnswer
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  return (
    <li data-testid="answer-wrap" className={[(answer.isCurrentAccountAnswer ? Styles.active : ''), Styles.answerWrap].join(' ')} >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
