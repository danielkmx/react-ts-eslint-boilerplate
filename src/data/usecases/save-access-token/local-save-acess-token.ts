import { UpdateCurrentAccount } from '@/domain/usecases/update-current-account'
import { SetStorage } from '@/data/protocols/cache/set-storage'
import { UnexpectedError } from '@/domain/errors'
import { AccountDto } from '@/domain/models/account-dto'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}
  async save (account: AccountDto): Promise<void> {
    if (!account.accessToken) {
      throw new UnexpectedError()
    }
    await this.setStorage.set('account',account)
  }
}
