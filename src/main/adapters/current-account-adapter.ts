import { UnexpectedError } from '@/domain/errors'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { makeLocalStorageAdapterFactory } from '@/main/factories/storage/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: UpdateCurrentAccount.Params): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdapterFactory().set('account', account)
}

export const getCurrentAccountAdapter = (): UpdateCurrentAccount.Params => {
  return makeLocalStorageAdapterFactory().get('account')
}
