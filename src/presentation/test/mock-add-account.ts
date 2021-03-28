import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/usecases/add-account'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccount.Params

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.account
  }
}
