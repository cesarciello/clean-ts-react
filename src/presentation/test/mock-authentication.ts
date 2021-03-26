import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account-model'
import { Authentication } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  email: string
  password: string
  callsCount: number = 0
  account: AccountModel = mockAccountModel()

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.email = params.email
    this.password = params.password
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
