import React, { useContext } from 'react'

import Styles from './lits-styles.scss'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Item, ItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {
        state.surveys.length
          ? state.surveys.map((survey: LoadSurveyList.Model) => <Item key={survey.id} survey={survey} />)
          : <ItemEmpty />
      }
    </ul>
  )
}

export default List
