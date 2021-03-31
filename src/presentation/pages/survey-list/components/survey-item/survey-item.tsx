import React from 'react'

import Styles from './survey-item-styles.scss'
import { Icon, IconName } from '@/presentation/components'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWarp} iconName={IconName.thumbDown} ></Icon>
        <time>
          <span className={Styles.day}>22</span>
          <span className={Styles.month}>02</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>Qual é seu FrameworkWeb favorito ?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
