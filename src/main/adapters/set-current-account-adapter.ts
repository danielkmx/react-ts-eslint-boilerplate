import { UnexpectedError } from '@/domain/errors'
import { AccountDto } from '@/domain/models/account-dto'
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountDto): void => {
  if (!account?.accessToken) throw new UnexpectedError()
  makeLocalStorageAdapter().set('account', account)
}
