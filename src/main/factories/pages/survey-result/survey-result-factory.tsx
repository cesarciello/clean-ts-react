
import React from 'react'

import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResultFactory } from '../../usecases/load-survey-result/load-survey-result-factory'
import { useParams } from 'react-router'

export const makeSurveyResultPageFactory: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResultFactory(id)}
    />)
}
