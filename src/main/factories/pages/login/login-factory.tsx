import React from 'react'
import { Login } from '@/presentation/pages'

import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeSaveAccessToken } from '../../cache/save-access-token-factory'

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validationComposite = makeLoginValidation()
  return (
    <Login
      saveAccessToken={makeSaveAccessToken()}
      authentication={remoteAuthentication}
      validation={validationComposite} />

  )
}
