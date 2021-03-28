import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLoginPageFactory } from './factories/pages/login/login-factory'
import { makeSignUpPageFactory } from './factories/pages/signup/signup-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLoginPageFactory}
    makeSignUp={makeSignUpPageFactory}
  />,
  document.getElementById('main')
)
