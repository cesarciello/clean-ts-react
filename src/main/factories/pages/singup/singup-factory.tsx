
import React from 'react'
import { SingUp } from '@/presentation/pages'
import { makeSingUpValidationFactory } from './singup-validation-factory'
import { makeRemoteAddAccountFactory } from '@/main/factories/usecases/add-account/add-account-factory'
import { makeLocalSaveAccessTokenFactory } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export const makeSingUpPageFactory: React.FC = () => {
  return (
    <SingUp
      validation={makeSingUpValidationFactory()}
      addAccount={makeRemoteAddAccountFactory()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />)
}
