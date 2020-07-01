import { HttpResponse } from './http-response'

export type HttpPostParams<T> = {
  url: string
  data: {
    body: object
    headers: object
  }
}

export interface HttpPostClient<T, R> {
  post (params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
