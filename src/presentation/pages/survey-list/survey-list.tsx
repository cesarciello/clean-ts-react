import { Footer, Logo } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Cesar</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <section className={Styles.contentWarp}>
        <h2>Enquete</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>02</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>Qual é seu FrameworkWeb favorito ?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </section>
      <Footer />
    </div>
  )
}

export default SurveyList
