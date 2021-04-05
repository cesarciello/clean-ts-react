import { mockAccountModel } from '@/domain/test'
import { Authentication } from '@/domain/usecases/authentication'

export class AuthenticationSpy implements Authentication {
  email: string
  password: string
  callsCount: number = 0
  account = mockAccountModel()

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.email = params.email
    this.password = params.password
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
