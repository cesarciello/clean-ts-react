import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'
import { makeLoginPageFactory } from './factories/pages/login/login-factory'

ReactDOM.render(
  <Router
    makeLogin={makeLoginPageFactory}
  />,
  document.getElementById('main')
)
