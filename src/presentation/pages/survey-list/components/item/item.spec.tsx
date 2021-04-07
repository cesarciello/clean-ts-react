import React from 'react'
import { screen, render } from '@testing-library/react'

import SurveyItem from './item'
import { IconName } from '@/presentation/components'
import { mockSurvey } from '@/domain/test'
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
      didAnswer: true
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('should render with correct load icon and day correcty', () => {
    const survey = {
      ...mockSurvey(),
      didAnswer: false
    }
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
