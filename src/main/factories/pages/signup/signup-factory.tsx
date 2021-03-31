
import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeSignUpValidationFactory } from './signup-validation-factory'
import { makeRemoteAddAccountFactory } from '@/main/factories/usecases/add-account/add-account-factory'
import { makeLocalUpdateCurrentAccountFactory } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'

export const makeSignUpPageFactory: React.FC = () => {
  return (
    <SignUp
      validation={makeSignUpValidationFactory()}
      addAccount={makeRemoteAddAccountFactory()}
      updateCurrentAccount={makeLocalUpdateCurrentAccountFactory()}
    />)
}
