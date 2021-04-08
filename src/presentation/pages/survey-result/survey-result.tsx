import React, { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'

import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { Calendar, Footer, Header, Loading, Error } from '@/presentation/components'
import { LoadSurveyResultSpy } from '@/domain/test'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const Surveyresult: React.FC<Props> = ({ loadSurveyResult = new LoadSurveyResultSpy() }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Result
  })

  useEffect(() => {
    loadSurveyResult.load()
      .then(surveyResult => {
        setState(old => ({
          ...old,
          surveyResult
        })
        )
      })
  }, [])

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
            <button>back</button>
          </>
        }
        {state.isLoading && <Loading />}
        {state.error && <Error error={state.error} onReload={() => null} />}
      </section>
      <Footer />
    </div>
  )
}

export default Surveyresult
