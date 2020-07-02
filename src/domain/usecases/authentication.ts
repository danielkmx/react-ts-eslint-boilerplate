import { AccountDto } from '../models/account-dto'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth (params: AuthenticationParams): Promise<AccountDto>
}
