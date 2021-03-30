import axios from 'axios'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import { AxiosHttpClient } from './axios-http-client'
import { mockAxios, mockHttpPostAxiosResponse } from '@/infra/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient<any>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => ({
  sut: new AxiosHttpClient(),
  mockedAxios: mockAxios()
})

describe('AxiosHttpClient', () => {
  describe('axios.post', () => {
    test('should call axios with correct values', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('should return correct statusCode and body', async () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())
      await expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    test('should return correct statusCode and body on failure', async () => {
      const { sut, mockedAxios } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpPostAxiosResponse()
      })
      const promise = sut.post(mockPostRequest())
      await expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('axios.get', () => {
    test('should call axios.get with correct url', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('should return correct result', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      const promise = sut.get(request)
      await expect(promise).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})
