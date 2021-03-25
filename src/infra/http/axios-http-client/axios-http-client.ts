import { HttpPostClient } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient<T, R> implements HttpPostClient<T, R> {
  async post(params: HttpPostClient.Params<T>): Promise<HttpPostClient.Result<R>> {
    await axios.post(params.url, params.body)
    return Promise.resolve({
      statusCode: 200
    })
  }
}
