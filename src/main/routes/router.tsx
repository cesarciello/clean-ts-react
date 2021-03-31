import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'
import { makeLoginPageFactory } from '@/main/factories/pages/login/login-factory'
import { makeSignUpPageFactory } from '@/main/factories/pages/signup/signup-factory'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLoginPageFactory} />
        <Route path="/signup" exact component={makeSignUpPageFactory} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
