import { HttpPostClient } from '@/data/protocols/http/http-post.client'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { HttpStatusCode, HttpResponse } from '../../protocols/http/http-response'
import { InvalidCredentialsError , UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models/account-models'
import { AccountDto } from '@/domain/models/account-dto'
const accountModelToAccountDto = (model: HttpResponse<AccountModel>): AccountDto => {
  const { email,uid } = model.body.data
  return {
    email,
    uid,
    accessToken: model.headers['access-token'],
    client: model.headers.client
  }
}
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
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return accountModelToAccountDto(httpResponse)
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
