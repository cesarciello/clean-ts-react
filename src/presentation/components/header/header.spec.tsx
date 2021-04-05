import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from '..'
import { AccountModel } from '@/domain/models/account-model'
import ApiContext from '@/presentation/context/api/api-context'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
  getCurrentAccountMock: () => AccountModel
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory()
  const setCurrentAccountMock = jest.fn()
  const getCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock, getCurrentAccount: () => account }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock,
    getCurrentAccountMock
  }
}

describe('Name of the group', () => {
  test('should call setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render username correctly', () => {
    const account = mockAccountModel()
    makeSut(account)
    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
