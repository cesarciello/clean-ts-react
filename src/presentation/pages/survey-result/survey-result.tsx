import React from 'react'
import FlipMove from 'react-flip-move'

import Styles from './survey-result-styles.scss'
import { Calendar, Footer, Header, Loading, Spinner } from '@/presentation/components'

const Surveyresult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <section className={Styles.contentWarp}>
        <hgroup>
          <Calendar date={new Date()} className={Styles.calendarWarp} />
          <h2>Question ?</h2>
        </hgroup>
        <FlipMove className={Styles.answerList}>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={Styles.answer}>Answer</span>
            <span className={Styles.percent}>100%</span>
          </li>
          <li className={Styles.active}>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={Styles.answer}>Answer</span>
            <span className={Styles.percent}>100%</span>
          </li>
          <li>
            <img src="http://fordevs.herokuapp.com/static/img/logo-react.png" />
            <span className={Styles.answer}>Answer</span>
            <span className={Styles.percent}>100%</span>
          </li>
        </FlipMove>
        <button>back</button>
        {false && <Loading />}
      </section>
      <Footer />
    </div>
  )
}

export default Surveyresult
