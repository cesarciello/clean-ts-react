import faker from 'faker'

import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'
import { AuthorizedHttpGetClientDecorator } from './authorized-http-get-client-decorator'

type SutTypes = {
  sut: AuthorizedHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy<any>
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizedHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizedHttpGetClientDecorator', () => {
  test('should calls GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('should not add token headers if get storage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const request = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.get(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual(request.headers)
  })
})
