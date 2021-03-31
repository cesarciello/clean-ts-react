import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { makeLocalStorageAdpterFactory } from '@/main/factories/storage/local-storage-adpater-factory'

export const makeLocalUpdateCurrentAccountFactory = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdpterFactory())
}
