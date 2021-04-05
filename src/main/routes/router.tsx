import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ApiContext from '@/presentation/context/api/api-context'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { makeLoginPageFactory } from '@/main/factories/pages/login/login-factory'
import { makeSignUpPageFactory } from '@/main/factories/pages/signup/signup-factory'
import { makeSurveyListPageFactory } from '@/main/factories/pages/survey-list/survey-list-factory'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLoginPageFactory} />
          <Route path="/signup" exact component={makeSignUpPageFactory} />
          <PrivateRoute path="/" exact component={makeSurveyListPageFactory} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
