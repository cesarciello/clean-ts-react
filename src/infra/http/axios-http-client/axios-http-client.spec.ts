import axios from 'axios'
import { mockAxios } from '../../test'
import { AxiosHttpClient } from './axios-http-client'
import { mockPostRequest } from '@/data/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient<any, any>
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => ({
  sut: new AxiosHttpClient(),
  mockedAxios: mockAxios()
})

describe('AxiosHttpClient', () => {
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
})
