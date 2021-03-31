import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'

export class UpdateCurrentAccountStub implements UpdateCurrentAccount {
  account: UpdateCurrentAccount.Params

  async save(acconut: UpdateCurrentAccount.Params): Promise<void> {
    this.account = acconut
  }
}
