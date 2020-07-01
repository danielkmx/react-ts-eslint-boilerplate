import faker from 'faker'
import { SetStorageSpy } from '@/data/test'
import { LocalUpdateCurrentAccount } from './local-save-acess-token'

describe('LocalSaveAccessToken' , () => {
  test('Deve chamar SetStorage com valor correto', async () => {
    const spy = new SetStorageSpy()
    const sut = new LocalUpdateCurrentAccount(spy)
    const accessToken = faker.random.words()
    const name = faker.random.word()
    const account = { accessToken: accessToken ,name: name }
    await sut.save(account)
    expect(spy.key).toBe('account')
    expect(spy.value).toBe(JSON.stringify(account))
  })
})
