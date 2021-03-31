import faker from 'faker'

import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdpter } from '@/infra/storage/local-storage-adpater'
import { setCurrentAccountAdpter, getCurrentAccountAdpter } from './current-account-adpter'

jest.mock('@/infra/storage/local-storage-adpater')

describe('CurrentAccountAdpter', () => {
  test('should call LocalStorageAdpter.set with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdpter.prototype, 'set')
    setCurrentAccountAdpter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('should throw UnexpectedError with inavlid values', () => {
    expect(() => {
      setCurrentAccountAdpter(undefined)
    }).toThrow(new UnexpectedError())
  })

  test('should call LocalStorageAdpter.get with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdpter.prototype, 'get').mockReturnValueOnce(account)
    const currentAccount = getCurrentAccountAdpter()
    expect(setSpy).toHaveBeenCalledWith('account')
    expect(currentAccount).toEqual(account)
  })
})
