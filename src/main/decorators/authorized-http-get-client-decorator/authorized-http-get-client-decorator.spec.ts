import faker from 'faker'

import { mockAccountModel } from '@/domain/test'
import { GetStorageSpy, HttpClientSpy, mockGetRequest } from '@/data/test'
import { AuthorizedHttpClientDecorator } from './authorized-http-get-client-decorator'
import { HttpClient } from '@/data/protocols/http'

type SutTypes = {
  sut: AuthorizedHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpClientSpy<any>
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpClientSpy()
  const sut = new AuthorizedHttpClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizedHttpGetClientDecorator', () => {
  test('should calls GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('should not add token headers if get storage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const request: HttpClient.Params = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      },
      method: 'get'
    }
    await sut.request(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual(request.headers)
  })

  test('should add token headers HttpClient on getStorage success', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const request: HttpClient.Params = {
      url: faker.internet.url(),
      method: 'get'
    }
    await sut.request(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('should merge headers HttpClient on getStorage success', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const request: HttpClient.Params = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      },
      method: 'get'
    }
    await sut.request(request)
    expect(httpGetClientSpy.url).toBe(request.url)
    expect(httpGetClientSpy.headers).toEqual({
      ...request.headers,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('should return the same result as HttpClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const httpResponse = await sut.request(mockGetRequest())
    expect(httpResponse).toBe(httpGetClientSpy.httpResponse)
  })
})
