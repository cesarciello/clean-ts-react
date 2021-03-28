import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Props> = ({ makeLogin, makeSignUp }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
