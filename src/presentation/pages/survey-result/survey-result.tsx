import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { Calendar, Footer, Header, Loading, Error } from '@/presentation/components'
import { LoadSurveyResultSpy } from '@/domain/test'
import { useAccessDeniedErrorHandler } from '@/presentation/hooks'
import { useHistory } from 'react-router'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const Surveyresult: React.FC<Props> = ({ loadSurveyResult = new LoadSurveyResultSpy() }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Result,
    reload: false
  })

  const { goBack } = useHistory()

  const accessDeniedErrorHandler = useAccessDeniedErrorHandler((error) => {
    setState(old => ({
      ...old,
      error: error.message,
      surveyResult: null
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

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <section data-testid="survey-result" className={Styles.contentWarp}>
        {state.surveyResult &&
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} className={Styles.calendarWarp} />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={Styles.answerList}>
              {
                state.surveyResult.answers.map(answer => (
                  <li key={answer.answer} data-testid="answer-wrap" className={answer.isCurrentAccountAnswer ? Styles.active : ''} >
                    {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                    <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                    <span data-testid="percent" className={Styles.percent}>{answer.percent}%</span>
                  </li>
                ))
              }
            </FlipMove>
            <button data-testid="back-button" onClick={goBack}>back</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} onReload={onReload} />}
      </section>
      <Footer />
    </div>
  )
}

export default Surveyresult
