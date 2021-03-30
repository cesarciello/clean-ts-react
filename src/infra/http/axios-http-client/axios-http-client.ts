import axios, { AxiosResponse } from 'axios'
import { HttpPostClient } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'

export class AxiosHttpClient<R> implements HttpPostClient<R>, HttpGetClient<R> {
  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result<R>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get(params: HttpGetClient.Params): Promise<HttpGetClient.Result<R>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.get(params.url)
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
