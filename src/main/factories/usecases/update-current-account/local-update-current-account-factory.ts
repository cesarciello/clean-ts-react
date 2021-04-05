import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { LocalUpdateCurrentAccount } from '@/data/usecases/update-current-account/local-update-current-account'
import { makeLocalStorageAdapterFactory } from '@/main/factories/storage/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccountFactory = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapterFactory())
}
