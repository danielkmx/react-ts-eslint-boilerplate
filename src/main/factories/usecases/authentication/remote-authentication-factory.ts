import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '../../http/axios-http-factory'

export const makeRemoteAuthentication = (): Authentication => {
  const url = ''
  return new RemoteAuthentication(makeAxiosHttpClient(),url)
}
