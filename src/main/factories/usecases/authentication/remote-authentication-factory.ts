import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '../../http/axios-http-factory'
import { makeApiUrl } from '../../http/api-url-factory'

export const makeRemoteAuthentication = (): Authentication => {
  const url = makeApiUrl('/auth/sign_in')
  return new RemoteAuthentication(makeAxiosHttpClient(),url)
}
