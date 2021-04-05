
import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { makeRemoteLoadSurveyListFactory } from '@/main/factories/usecases/load-survey-list/load-survey-list-factory'

export const makeSurveyListPageFactory: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyListFactory()}
    />)
}
