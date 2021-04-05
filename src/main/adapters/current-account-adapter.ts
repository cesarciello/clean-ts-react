import { AccountModel } from '@/domain/models/account-model'
import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdapterFactory } from '../factories/storage/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapterFactory().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapterFactory().get('account')
}
