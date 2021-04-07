import React from 'react'

import Styles from './lits-styles.scss'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Item, ItemEmpty } from '@/presentation/pages/survey-list/components'

type Props = {
  surveys: LoadSurveyList.Result
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {
        surveys.length
          ? surveys.map((survey: LoadSurveyList.Model) => <Item key={survey.id} survey={survey} />)
          : <ItemEmpty />
      }
    </ul>
  )
}

export default List
