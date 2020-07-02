import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import { makeLogin } from '../factories/pages/login/login-factory'
import { ApiContext } from '@/presentation/contexts'
import { setCurrentAccountAdapter } from '../adapters'

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
