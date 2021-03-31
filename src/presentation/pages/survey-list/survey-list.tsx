import React from 'react'

import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty, SurveyItem } from './components'

const SurveyList: React.FC = () => {
  return (
    <div data-testid="survey-list" className={Styles.surveyListWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <h2>Enquete</h2>
        <ul>
          <SurveyItemEmpty />
        </ul>
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
