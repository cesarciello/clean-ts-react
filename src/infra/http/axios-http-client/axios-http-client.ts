import axios, { AxiosResponse } from 'axios'
import { HttpClient } from '@/data/protocols/http'

export class AxiosHttpClient<R> implements HttpClient<R> {
  async request(params: HttpClient.Params): Promise<HttpClient.Response<R>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
