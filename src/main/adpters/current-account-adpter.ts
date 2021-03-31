import { AccountModel } from '@/domain/models/account-model'
import { UnexpectedError } from '@/domain/errors'
import { makeLocalStorageAdpterFactory } from '../factories/storage/local-storage-adpater-factory'

export const setCurrentAccountAdpter = (account: AccountModel): void => {
  if (!account?.accessToken) {
    throw new UnexpectedError()
  }
  makeLocalStorageAdpterFactory().set('account', account)
}
