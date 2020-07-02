import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory'
import { ApiContext } from '@/presentation/contexts'
import { UnexpectedError } from '@/domain/errors'
import { AccountDto } from '@/domain/models/account-dto'
import { makeLocalStorageAdapter } from '../factories/cache/local-storage-adapter-factory'

const setCurrentAccountAdapter = (account: AccountDto): void => {
  if (!account?.accessToken) throw new UnexpectedError()
  makeLocalStorageAdapter().set('account', account)
}

export const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{ setCurrentAccount: setCurrentAccountAdapter }}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>

  )
}

export default Router
