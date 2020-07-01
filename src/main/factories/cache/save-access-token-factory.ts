import { SaveAccessToken } from '@/domain/usecases'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-acess-token'
import { makeLocalStorageAdapter } from './local-storage-adapter-factory'

export const makeSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
