import React, { useEffect, useState } from 'react'

import Result from './components/result/result'
import SurveyResultContext from './components/context/context'
import Styles from './survey-result-styles.scss'
import { LoadSurveyResultSpy } from '@/domain/test'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { useAccessDeniedErrorHandler } from '@/presentation/hooks'
import { Footer, Header, Loading, Error } from '@/presentation/components'
import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const Surveyresult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Result,
    reload: false
  })

  const accessDeniedErrorHandler = useAccessDeniedErrorHandler((error) => {
    setState(old => ({
      ...old,
      error: error.message,
      surveyResult: null,
      isLoading: false
    }))
  })

  const onReload = (): void => {
    setState(old => ({
      surveyResult: null as LoadSurveyResult.Result,
      error: '',
      isLoading: false,
      reload: !old.reload
    }))
  }

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => {
        setState(old => ({
          ...old,
          surveyResult
        }))
      })
      .catch(accessDeniedErrorHandler)
  }, [state.reload])

  const onChangeAnswer = (answer: string): void => {
    setState(old => ({
      ...old,
      isLoading: true
    }))
    saveSurveyResult.save({ answer })
      .then()
      .catch(accessDeniedErrorHandler)
  }

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onChangeAnswer }}>
        <section data-testid="survey-result" className={Styles.contentWarp}>
          {state.surveyResult && <Result surveyResult={state.surveyResult} />}
          {state.isLoading && <Loading />}
          {state.error && <Error error={state.error} onReload={onReload} />}
        </section>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default Surveyresult
