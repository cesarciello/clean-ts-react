import React, { useContext, useEffect, useState } from 'react'

import Styles from './survey-list-styles.scss'
import { SurveyContext, List, Error } from './components'
import { Footer, Header } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { AccessDeniedError } from '@/domain/errors'
import { useHistory } from 'react-router'
import ApiContext from '@/presentation/context/api/api-context'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          history.replace('/login')
          setCurrentAccount(null)
        }
        setState({ ...state, error: error.message })
      })
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
