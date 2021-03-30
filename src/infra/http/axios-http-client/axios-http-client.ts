import axios, { AxiosResponse } from 'axios'
import { HttpPostClient } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'

export class AxiosHttpClient<R> implements HttpPostClient<R>, HttpGetClient<R> {
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

  async get(params: HttpGetClient.Params): Promise<HttpGetClient.Result<R>> {
    const httpReponse = await axios.get(params.url)
    return {
      statusCode: httpReponse.status,
      body: httpReponse.data
    }
  }
}
