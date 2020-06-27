import { HttpPostClient } from '../../protocols/http/http-post.client'
import { AuthenticationParams } from '@/domain/usecases/authentication'

export class RemoteAuthentication {
  constructor (
    private readonly httpPostClient: HttpPostClient,
    private readonly url: string) {
  }

  async auth (params: AuthenticationParams): Promise<void> {
    console.log('-----------------------')
    console.log(params)
    await this.httpPostClient.post({
      url: this.url,
      body: params
    })
  }
}
