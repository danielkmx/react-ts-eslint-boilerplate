import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'
import { AccountDto } from '@/domain/models/account-dto'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  test('Deve chamar localStorage.setItem com valores corretos', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountDto>()
    sut.set(key,value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key,JSON.stringify(value))
  })
  test('Deve chamar localStorage.getItem com valores corretos', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountDto>()
    const getItemSpy = jest.spyOn(localStorage,'getItem').mockReturnValueOnce(JSON.stringify(value))
    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
