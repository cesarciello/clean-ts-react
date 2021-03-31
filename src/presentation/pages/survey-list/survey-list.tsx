import { Footer, Header } from '@/presentation/components'
import React from 'react'
import { SurveyItemEmpty, SurveyItem } from './components'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
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
