import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import SurveyResult from './survey-result'
import ApiContext from '@/presentation/context/api/api-context'
import { mockAccountModel, LoadSurveyResultSpy } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn(), getCurrentAccount: () => mockAccountModel() }}>
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy
  }
}

describe('SurveyResult Component', () => {
  test('should present empty on initial state', async () => {
    makeSut()
    const surveyResult = screen.getByTestId('survey-result')
    expect(surveyResult.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    await waitFor(() => surveyResult)
  })

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
  })
})
