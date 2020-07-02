import { AccountDto } from '../models/account-dto'

export interface UpdateCurrentAccount {
  save: (account: AccountDto) => Promise<void>
}
