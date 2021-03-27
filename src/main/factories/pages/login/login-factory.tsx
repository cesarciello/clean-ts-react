
import React from 'react'
import { Login } from '@/presentation/pages'
import { makeLoginValidationFactory } from './login-validation-factory'
import { makeRemoteAuthenticatioFactory } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessTokenFactory } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export const makeLoginPageFactory: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidationFactory()}
      authentication={makeRemoteAuthenticatioFactory()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />)
}
