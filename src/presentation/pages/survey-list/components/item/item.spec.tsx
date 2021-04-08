import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import SurveyItem from './item'
import { IconName } from '@/presentation/components'
import { mockSurvey } from '@/domain/test'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { Router } from 'react-router'

type SutTypes = {
  survey: LoadSurveyList.Model
  history: MemoryHistory
}

const makeSut = (survey: LoadSurveyList.Model = mockSurvey()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>)
  return {
    survey,
    history
  }
}

describe('SurveyItem', () => {
  test('should render with correct values', () => {
    const survey = {
      ...mockSurvey(),
      didAnswer: true,
      date: new Date('2021-03-30T00:00:00')
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('should render with correct load icon and day correcty', () => {
    const survey = {
      ...mockSurvey(),
      didAnswer: false,
      date: new Date('2021-03-03T00:00:00')
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('should redirect to survey result', async () => {
    const { history, survey: { id } } = makeSut()
    fireEvent.click(screen.getByTestId('result'))
    expect(history.location.pathname).toBe(`/surveys/${id}/results`)
  })
})
