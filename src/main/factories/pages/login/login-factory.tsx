
import React from 'react'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'

export const makeLoginPageFactory: React.FC = () => {
  const authehntication = new RemoteAuthentication('http://fordevs.herokuapp.com/api/login', new AxiosHttpClient())
  const validation = new ValidationComposite([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])
  return (
    <Login
      validation={validation}
      authentication={authehntication}
    />)
}
