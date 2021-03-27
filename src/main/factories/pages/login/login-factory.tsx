
import React from 'react'
import { Login } from '@/presentation/pages'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { makeRemoteAuthenticatioFactory } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLoginValidationFactory } from './login-validation-factory'

export const makeLoginPageFactory: React.FC = () => {
  return (
    <Login
      validation={makeLoginValidationFactory()}
      authentication={makeRemoteAuthenticatioFactory()}
    />)
}
