import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import SurveyList from './survey-list'
import { mockSurveyList } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { UnexpectedError } from '@/domain/errors'

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0
  surveyList = mockSurveyList()
  async loadAll(): Promise<LoadSurveyList.Result> {
    this.callsCount++
    return this.surveyList
  }
}

const makeSut = (loadSurveyListSpy: LoadSurveyListSpy): void => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    loadSurveyListSpy.surveyList = []
    makeSut(new LoadSurveyListSpy())
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    await waitFor(() => surveyList)
  })

  test('should render SurveyItem on success', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    makeSut(loadSurveyListSpy)
    const surveyList = screen.getByTestId('survey-list')
    await waitFor(() => surveyList)
    expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(loadSurveyListSpy.surveyList.length)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
  })

  test('should render error message on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)
    makeSut(loadSurveyListSpy)
    await waitFor(() => screen.getByRole('heading'))
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('should call LoadSurveyList', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()
    makeSut(loadSurveyListSpy)
    expect(loadSurveyListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })
})
