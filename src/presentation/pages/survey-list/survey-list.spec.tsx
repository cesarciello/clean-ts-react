import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { render, screen } from '@testing-library/react'
import React from 'react'
import SurveyList from './survey-list'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}
class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0
  async loadAll(): Promise<LoadSurveyList.Result> {
    this.callsCount++
    return []
  }
}

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy()
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />)
  return {
    loadSurveyListSpy
  }
}

describe('SurveyList Component', () => {
  test('should present 4 empty items on start', () => {
    makeSut()
    const surveyList = screen.getByTestId('survey-list')
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)
  })
})
