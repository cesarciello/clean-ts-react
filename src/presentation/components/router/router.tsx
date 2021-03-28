import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SingUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
  makeSingUp: React.FC
}

const Router: React.FC<Props> = ({ makeLogin, makeSingUp }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/singup" exact component={makeSingUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
