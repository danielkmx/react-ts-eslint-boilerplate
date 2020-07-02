import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountDto } from '@/domain/models/account-dto'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Deve chamar localStorage com valores corretos', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountDto>()
    sut.set(key,value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key,JSON.stringify(value))
  })
})
