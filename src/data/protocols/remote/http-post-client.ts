export interface HttpPostClient {
  post(params: HttpPostClient.Params): Promise<void>
}

export namespace HttpPostClient {
  export type Params = {
    url: string
    body?: any
  }
}
