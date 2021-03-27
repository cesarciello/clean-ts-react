import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SingUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/singup" exact component={SingUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
