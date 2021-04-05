import { UnexpectedError } from '@/domain/errors'
import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { SetStorage } from '@/data/protocols/storage/set-storage'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) { }

  async save(account: UpdateCurrentAccount.Params): Promise<void> {
    if (!account?.accessToken) {
      throw new UnexpectedError()
    }
    this.setStorage.set('account', account)
  }
}
