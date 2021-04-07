import React, { useState } from 'react'
import FlipMove from 'react-flip-move'

import Styles from './survey-result-styles.scss'
import { LoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { Calendar, Footer, Header, Loading, Error } from '@/presentation/components'

const Surveyresult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyresult: null as LoadSurveyResult.Result
  })
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <section data-testid="survey-result" className={Styles.contentWarp}>
        {state.surveyresult &&
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWarp} />
              <h2>Lorem, ipsum dolor dolores consequuntur ipsam ullam saepe nulla ?</h2>
            </hgroup>
            <FlipMove className={Styles.answerList}>
              <li>
                <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
                <span className={Styles.answer}>Answer</span>
                <span className={Styles.percent}>100%</span>
              </li>
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
