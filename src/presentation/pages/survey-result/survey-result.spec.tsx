import React from 'react'
import { Router } from 'react-router'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import SurveyResult from './survey-result'
import ApiContext from '@/presentation/context/api/api-context'
import { AccountModel } from '@/domain/models/account-model'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { mockAccountModel, LoadSurveyResultSpy, mockSurveyResult, SaveSurveyResultSpy } from '@/domain/test'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy(), saveSurveyResultSpy = new SaveSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn()
  const history = createMemoryHistory({ initialEntries: ['', '/survey/any_id'], initialIndex: 1 })
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => mockAccountModel() }}>
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} saveSurveyResult={saveSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  )
  return {
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    history,
    setCurrentAccountMock
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

  test('should render error message if LoadSurveyResult fails', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('should logout AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.queryByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should back button redirect to list surveys', async () => {
    const { history } = makeSut()
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('back-button'))
    expect(history.location.pathname).toBe('/')
  })

  test('should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(new UnexpectedError())
    makeSut(loadSurveyResultSpy)
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.getByTestId('reload'))
    expect(loadSurveyResultSpy.callsCount).toBe(1)
    await waitFor(() => screen.queryByTestId('survey-result'))
  })

  test('should not call SaveSurveyResult on click in answer already is the current (active)', async () => {
    makeSut()
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[0])
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('should call SaveSurveyResult on click in answer not is the current (active)', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    expect(screen.queryByTestId('loading')).toBeInTheDocument()
    expect(saveSurveyResultSpy.callsCount).toBe(1)
    expect(saveSurveyResultSpy.answer).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[1].answer
    })
  })

  test('should render error message if SaveSurveyResult fails', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)
    makeSut(new LoadSurveyResultSpy(), saveSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.queryByTestId('question')).not.toBeInTheDocument()
    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('should logout AccessDeniedError if SaveSurveyResult fails', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new AccessDeniedError())
    const { history, setCurrentAccountMock } = makeSut(new LoadSurveyResultSpy(), saveSurveyResultSpy)
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should present SurveyResult on SaveSurveyResult success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    saveSurveyResultSpy.surveyResult = {
      ...mockSurveyResult(),
      date: new Date('2021-04-08T00:00:00')
    }
    makeSut(new LoadSurveyResultSpy(), saveSurveyResultSpy)
    await waitFor(() => screen.getByTestId('survey-result'))
    const answerWrap = screen.queryAllByTestId('answer-wrap')
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(screen.getByTestId('question')).toHaveTextContent(saveSurveyResultSpy.surveyResult.question)
    expect(screen.getByTestId('day')).toHaveTextContent('08')
    expect(screen.getByTestId('month')).toHaveTextContent('abr')
    expect(screen.getByTestId('year')).toHaveTextContent('2021')
    expect(screen.getByTestId('answers').childElementCount).toBe(2)
    expect(answerWrap[0]).toHaveClass('active')
    expect(answerWrap[1]).not.toHaveClass('active')
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    const images = screen.queryAllByTestId('image')
    expect(images[0]).toHaveAttribute('src', saveSurveyResultSpy.surveyResult.answers[1].image)
    expect(images[0]).toHaveAttribute('alt', saveSurveyResultSpy.surveyResult.answers[1].answer)
    expect(images[1]).toBeFalsy()
    const answers = screen.queryAllByTestId('answer')
    expect(answers[0]).toHaveTextContent(saveSurveyResultSpy.surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(saveSurveyResultSpy.surveyResult.answers[1].answer)
    const percents = screen.queryAllByTestId('percent')
    expect(percents[0]).toHaveTextContent(`${saveSurveyResultSpy.surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${saveSurveyResultSpy.surveyResult.answers[1].percent}%`)
  })

  test('should prevent multiples click on SaveSurveyResult', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    makeSut(new LoadSurveyResultSpy(), saveSurveyResultSpy)
    await waitFor(() => screen.queryByTestId('survey-result'))
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    fireEvent.click(screen.queryAllByTestId('answer-wrap')[1])
    await waitFor(() => screen.getByTestId('survey-result'))
    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
