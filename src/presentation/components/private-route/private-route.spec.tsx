import React from 'react'
import { render } from '@testing-library/react'
import { createMemoryHistory ,MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/contexts'
import { mockAccountDto } from '@/domain/test/mock-account-dto'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountDto()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{
      getCurrentAccount: () => account ,
      setCurrentAccount: () => ''
    }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>

  )
  return { history }
}

describe('Private route', () => {
  test('Should redirect to login', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })
  test('Should not redirect', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
