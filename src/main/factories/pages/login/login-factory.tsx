
import React from 'react'
import { Login } from '@/presentation/pages'
import { makeLoginValidationFactory } from './login-validation-factory'
import { makeRemoteAuthenticatioFactory } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalUpdateCurrentAccountFactory } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'

export const makeLoginPageFactory: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidationFactory()}
      authentication={makeRemoteAuthenticatioFactory()}
      updateCurrentAccount={makeLocalUpdateCurrentAccountFactory()}
    />)
}
