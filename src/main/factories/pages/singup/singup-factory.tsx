
import React from 'react'
import { SingUp } from '@/presentation/pages'
import { makeSingUpValidationFactory } from './singup-validation-factory'
import { makeRemoteAuthenticatioFactory } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessTokenFactory } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export const makeSingUpPageFactory: React.FC = () => {
  return (
    <SingUp
      validation={makeSingUpValidationFactory()}
      addAccount={makeRemoteAuthenticatioFactory()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />)
}
