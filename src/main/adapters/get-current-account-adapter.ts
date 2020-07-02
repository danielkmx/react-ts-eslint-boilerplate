import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'
import { AccountDto } from '@/domain/models/account-dto'

export const getCurrentAccountAdapter = (): AccountDto => {
  return makeLocalStorageAdapter.get('account')
}
