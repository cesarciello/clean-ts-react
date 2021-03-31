import React, { useEffect } from 'react'

import Styles from './survey-list-styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveyItemEmpty, SurveyItem } from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      await loadSurveyList.loadAll()
    })()
  }, [])

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
