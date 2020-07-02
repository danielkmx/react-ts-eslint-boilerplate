import { HttpPostClient } from '@/data/protocols/http/http-post.client'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { HttpStatusCode } from '../../protocols/http/http-response'
import { InvalidCredentialsError , UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-models'
import { AccountDto } from '@/domain/models/account-dto'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
    private readonly url: string) {
  }

  async auth (params: AuthenticationParams): Promise<AccountDto> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      data: { body: params, headers: { Authorization: process.env.auth } }

    })
    const { email,uid } = httpResponse?.body.data
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return {
        email,
        uid,
        accessToken: httpResponse.headers['access-token'],
        client: httpResponse.headers.client
      }
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
