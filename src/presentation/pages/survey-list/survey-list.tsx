import { Footer, Header, Icon, IconName } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <h2>Enquete</h2>
        <ul>
          <li>
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
        </ul>
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
