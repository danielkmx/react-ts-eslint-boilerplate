import { HttpPostClient } from '@/domain/data/protocols/http/http-post.client'
import { AuthenticationParams } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '../../protocols/http/http-response'
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error'

export class RemoteAuthentication {
  constructor (
    private readonly httpPostClient: HttpPostClient,
    private readonly url: string) {
  }

  async auth (params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: return Promise.resolve()
    }
  }
}
