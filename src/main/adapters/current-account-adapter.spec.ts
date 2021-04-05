import faker from 'faker'

import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from './current-account-adapter'

jest.mock('@/infra/storage/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw UnexpectedError with inavlid values', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined)
    }).toThrow(new UnexpectedError())
  })

  test('should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(account)
    const currentAccount = getCurrentAccountAdapter()
    expect(setSpy).toHaveBeenCalledWith('account')
    expect(currentAccount).toEqual(account)
  })
})
