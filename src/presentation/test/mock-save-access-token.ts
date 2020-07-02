import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { AccountDto } from '@/domain/models/account-dto'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountDto
  async save (account: AccountDto): Promise<void> {
    this.account = account
  }
}
