import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      const { data } = params
      httpResponse = await axios.request({
        url: params.url,
        data: data.body,
        method: 'post',
        headers: data.headers
      })
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data,
        headers: {}
      }
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
      headers: httpResponse.headers

    }
  }
}
