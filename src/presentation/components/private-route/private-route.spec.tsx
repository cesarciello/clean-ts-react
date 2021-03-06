import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import PrivateRoute from './private-route'
import { mockAccountModel } from '@/domain/test'
import ApiContext from '@/presentation/context/api/api-context'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account: UpdateCurrentAccount.Params): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history} >
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history
  }
}

describe('PrivateRoute', () => {
  test('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  test('should render current component if token is not empty', () => {
    const { history } = makeSut(mockAccountModel())
    expect(history.location.pathname).toBe('/')
  })
})
