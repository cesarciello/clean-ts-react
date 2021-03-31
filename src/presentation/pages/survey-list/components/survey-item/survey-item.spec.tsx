import React from 'react'
import { screen, render } from '@testing-library/react'

import SurveyItem from './survey-item'
import { mockSurvey } from '@/domain/test'
import { SurveyModel } from '@/domain/models/survey-model'
import { IconName } from '@/presentation/components'

type SutTypes = {
  survey: SurveyModel
}

const makeSut = (survey: SurveyModel = mockSurvey()): SutTypes => {
  render(<SurveyItem survey={survey} />)
  return {
    survey
  }
}

describe('SurveyItem', () => {
  test('should render with correct values', () => {
    const survey = mockSurvey()
    survey.didAnswer = true
    survey.date = new Date('2021-03-30T00:00:00')
    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
