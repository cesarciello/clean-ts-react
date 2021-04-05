import React, { useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'
import { SurveyItemEmpty, SurveyItem } from './components'
import { Footer, Header } from '@/presentation/components'
import { SurveyModel } from '@/domain/models/survey-model'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: ''
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => setState({ ...state, error: error.message }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <h2>Enquete</h2>
        {
          state.error
            ? (
              <div>
                <span data-testid="error">
                  {state.error}
                </span>
                <button>recarregar</button>
              </div>)
            : (
              <ul data-testid="survey-list">
                {
                  state.surveys.length
                    ? state.surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
                    : <SurveyItemEmpty />
                }
              </ul>)
        }
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
