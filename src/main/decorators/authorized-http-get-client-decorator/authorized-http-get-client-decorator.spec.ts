import { GetStorageSpy, mockGetRequest } from '@/data/test'
import { AuthorizedHttpGetClientDecorator } from './authorized-http-get-client-decorator'

type SutTypes = {
  sut: AuthorizedHttpGetClientDecorator
  getStorage: GetStorageSpy
}

const makeSut = (): SutTypes => {
  const getStorage = new GetStorageSpy()
  const sut = new AuthorizedHttpGetClientDecorator(getStorage)
  return {
    sut,
    getStorage
  }
}

describe('AuthorizedHttpGetClientDecorator', () => {
  test('should calls GetStorage with correct value', () => {
    const { sut, getStorage } = makeSut()
    sut.get(mockGetRequest())
    expect(getStorage.key).toBe('account')
  })
})
