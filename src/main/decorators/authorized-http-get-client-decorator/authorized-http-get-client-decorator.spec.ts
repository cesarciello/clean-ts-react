import faker from 'faker'

import { mockAccountModel } from '@/domain/test'
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

  test('should add token headers HttpClient on getStorage success', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const request = {
      url: faker.internet.url()
    }
    await sut.get(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('should merge headers HttpClient on getStorage success', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const request = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }
    await sut.get(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...request.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('should return the same result as HttpClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toBe(httpGetClientSpy.httpResponse)
  })
})
