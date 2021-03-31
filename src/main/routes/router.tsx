import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'
import ApiContext from '@/presentation/context/api/api-context'
import { setCurrentAccountAdpter, getCurrentAccountAdpter } from '@/main/adpters/current-account-adpter'
import { makeLoginPageFactory } from '@/main/factories/pages/login/login-factory'
import { makeSignUpPageFactory } from '@/main/factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdpter,
      getCurrentAccount: getCurrentAccountAdpter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLoginPageFactory} />
          <Route path="/signup" exact component={makeSignUpPageFactory} />
          <Route path="/" exact component={SurveyList} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
