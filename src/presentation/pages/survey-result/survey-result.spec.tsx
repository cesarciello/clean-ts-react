import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import SurveyResult from './survey-result'
import ApiContext from '@/presentation/context/api/api-context'
import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResult } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
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

  test('should present SurveyResult on success', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    loadSurveyResultSpy.surveyResult = {
      ...mockSurveyResult(),
      date: new Date('2021-04-07T00:00:00')
    }
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('question')).toHaveTextContent(loadSurveyResultSpy.surveyResult.question)
    expect(screen.getByTestId('day')).toHaveTextContent('07')
    expect(screen.getByTestId('month')).toHaveTextContent('abr')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', loadSurveyResultSpy.surveyResult.answers[1].image)
    expect(images[0]).toHaveAttribute('alt', loadSurveyResultSpy.surveyResult.answers[1].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(loadSurveyResultSpy.surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(loadSurveyResultSpy.surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${loadSurveyResultSpy.surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${loadSurveyResultSpy.surveyResult.answers[1].percent}%`)
  })
})
