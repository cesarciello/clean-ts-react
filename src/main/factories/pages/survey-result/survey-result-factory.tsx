
import React from 'react'
import { useParams } from 'react-router-dom'

import { SurveyResult } from '@/presentation/pages'
import { makeRemoteLoadSurveyResultFactory } from '@/main/factories/usecases/load-survey-result/load-survey-result-factory'
import { makeRemoteSaveSurveyResultFactory } from '@/main/factories/usecases/save-survey-result/save-survey-result-factory'

export const makeSurveyResultPageFactory: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResultFactory(id)}
      saveSurveyResult={makeRemoteSaveSurveyResultFactory(id)}
    />)
}
