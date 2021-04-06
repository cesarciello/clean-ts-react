import React, { useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'
import { SurveyContext, List, Error } from './components'
import { useErrorHandler } from '@/presentation/hooks'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const handleError = useErrorHandler((error) => setState({ ...state, error: error.message }))
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <h2>Surveys</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <List />}
        </SurveyContext.Provider>
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
