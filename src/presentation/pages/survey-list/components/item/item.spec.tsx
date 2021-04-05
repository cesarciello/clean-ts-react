import React from 'react'
import { screen, render } from '@testing-library/react'

import SurveyItem from './item'
import { mockSurvey } from '@/domain/test'
import { IconName } from '@/presentation/components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

type SutTypes = {
  survey: LoadSurveyList.Model
}

const makeSut = (survey: LoadSurveyList.Model = mockSurvey()): SutTypes => {
  render(<SurveyItem survey={survey} />)
  return {
    survey
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
})