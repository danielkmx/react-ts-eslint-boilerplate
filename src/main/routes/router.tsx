import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter,getCurrentAccountAdapter } from '../adapters'
import { PrivateRoute } from '@/presentation/components'

export const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={makeLogin}/>
          <PrivateRoute path='/' />

        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>

  )
}

export default Router
