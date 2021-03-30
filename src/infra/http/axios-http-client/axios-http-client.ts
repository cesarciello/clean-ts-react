import axios, { AxiosResponse } from 'axios'
import { HttpPostClient } from '@/data/protocols/http'

export class AxiosHttpClient<R> implements HttpPostClient<R> {
  async post(params: HttpPostClient.Params): Promise<HttpPostClient.Result<R>> {
    let httpResponse: AxiosResponse
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error.response
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
