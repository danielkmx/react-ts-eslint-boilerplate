import { UpdateCurrentAccount } from '@/domain/usecases'
import { LocalUpdateCurrentAccount } from '@/data/usecases/save-access-token/local-save-acess-token'
import { makeLocalStorageAdapter } from './local-storage-adapter-factory'

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
