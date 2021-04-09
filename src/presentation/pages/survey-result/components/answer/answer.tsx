import React, { useContext } from 'react'

import Styles from './answer-styles.scss'
import SurveyResultContext from '../context/context'
import { SurveyResultAnswer } from '@/domain/models/survey-result-model'

type Props = {
  answer: SurveyResultAnswer
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onChangeAnswer } = useContext(SurveyResultContext)

  const changeChoiceAnswer = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    event.preventDefault()
    if (!event.currentTarget.classList.contains('active')) {
      onChangeAnswer(answer.answer)
      console.log(event)
    }
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[(answer.isCurrentAccountAnswer ? Styles.active : ''), Styles.answerWrap].join(' ')}
      onClick={changeChoiceAnswer}
    >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
      <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
    </li>
  )
}

export default Answer
