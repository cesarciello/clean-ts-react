
import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidationFactory } from './signup-validation-factory'
import { makeRemoteAddAccountFactory } from '@/main/factories/usecases/add-account/add-account-factory'
import { makeLocalSaveAccessTokenFactory } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

export const makeSignUpPageFactory: React.FC = () => {
  return (
    <SignUp
      validation={makeSignUpValidationFactory()}
      addAccount={makeRemoteAddAccountFactory()}
      saveAccessToken={makeLocalSaveAccessTokenFactory()}
    />)
}
