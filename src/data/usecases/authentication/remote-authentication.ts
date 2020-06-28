import { HttpPostClient } from '@/data/protocols/http/http-post.client'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '../../protocols/http/http-response'
import { InvalidCredentialsError , UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-models'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
    private readonly url: string) {
  }

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
