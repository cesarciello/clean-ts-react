import React from 'react'
import { screen, render } from '@testing-library/react'

import Calendar from './calendar'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('Calendar', () => {
  test('should render with correct values', () => {
    makeSut(new Date('2021-03-30T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('30')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })

  test('should render day correcty', () => {
    makeSut(new Date('2021-03-03T00:00:00'))
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mar')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
  })
})
