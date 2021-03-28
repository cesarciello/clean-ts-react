import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLoginPageFactory } from './factories/pages/login/login-factory'
import { makeSingUpPageFactory } from './factories/pages/singup/singup-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLoginPageFactory}
    makeSingUp={makeSingUpPageFactory}
  />,
  document.getElementById('main')
)
