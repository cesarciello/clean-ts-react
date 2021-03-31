import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdpter } from '@/infra/storage/local-storage-adpater'
import { setCurrentAccountAdpter } from './current-account-adpter'

jest.mock('@/infra/storage/local-storage-adpater')

describe('CurrentAccountAdpter', () => {
  test('should call LocalStorageAdpter with correct values', () => {
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
})
