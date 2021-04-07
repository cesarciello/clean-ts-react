import React, { useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'
import { List } from './components'
import { Footer, Header, Error } from '@/presentation/components'
import { useAccessDeniedErrorHandler } from '@/presentation/hooks'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const accessDeniedErrorHandler = useAccessDeniedErrorHandler((error) => setState({ ...state, error: error.message }))
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  const onReload = (): void => {
    setState(old => ({
      surveys: [] as LoadSurveyList.Model[],
      error: '',
      reload: !old.reload
    }))
  }

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch(accessDeniedErrorHandler)
  }, [state.reload])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <h2>Surveys</h2>
        {state.error
          ? <Error error={state.error} onReload={onReload} />
          : <List surveys={state.surveys} />}
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
