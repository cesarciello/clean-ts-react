import React from 'react'

import Styles from './item-styles.scss'
import { Icon, IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWarp} iconName={iconName} ></Icon>
        <time>
          <span data-testid="day" className={Styles.day}>{survey.date.getDate().toString().padStart(2, '0')}</span>
          <span data-testid="month" className={Styles.month}>{survey.date.toLocaleString('pt-br', { month: 'short' }).replace('.', '')}</span>
          <span data-testid="year" className={Styles.year}>{survey.date.getFullYear()}</span>
        </time>
        <p data-testid="question" >{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem