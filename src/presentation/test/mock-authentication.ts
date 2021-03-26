import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models/account-model'
import { Authentication } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  email: string
  password: string

  async auth(params: Authentication.Params): Promise<AccountModel> {
    this.email = params.email
    this.password = params.password
    return Promise.resolve(mockAccountModel())
  }
}
