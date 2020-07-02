import { SetStorageSpy } from '@/data/test'
import { LocalUpdateCurrentAccount } from './local-save-acess-token'
import { mockAccountModel } from '@/domain/test'

describe('LocalSaveAccessToken' , () => {
  test('Deve chamar SetStorage com valor correto', async () => {
    const spy = new SetStorageSpy()
    const sut = new LocalUpdateCurrentAccount(spy)
    const account = mockAccountModel()
    const accountDto = {
      accessToken: account.headers['access-token'],
      uid: account.body.data.uid,
      email: account.body.data.uid,
      client: account.headers.client
    }
    await sut.save(accountDto)
    expect(spy.key).toBe('account')
    expect(spy.value).toBe(accountDto)
  })
})
