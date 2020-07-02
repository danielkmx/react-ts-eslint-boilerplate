import { AuthenticationParams, Authentication } from '@/domain/usecases'
import { AccountDto } from '@/domain/models/account-dto'
import { mockAccountDto } from '@/domain/test/mock-account-dto'

export class AuthenticationSpy implements Authentication {
  callsCount = 0
  account = mockAccountDto()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountDto> {
    this.params = params
    this.callsCount++
    return Promise.resolve(this.account)
  }
}
