import React from 'react'
import { Login } from '@/presentation/pages'

import { makeRemoteAuthentication } from '../../usecases/authentication/remote-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { makeUpdateCurrentAccount } from '../../cache/save-access-token-factory'

export const makeLogin: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication()
  const validationComposite = makeLoginValidation()
  return (
    <Login
      updateCurrentAccount={makeUpdateCurrentAccount()}
      authentication={remoteAuthentication}
      validation={validationComposite} />

  )
}
