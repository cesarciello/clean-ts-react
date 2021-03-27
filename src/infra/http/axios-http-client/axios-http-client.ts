import axios, { AxiosResponse } from 'axios'
import { HttpPostClient } from '@/data/protocols/http'

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Result<R>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (error) {
      httpResponse = error
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
