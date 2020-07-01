import faker from 'faker'
import { SetStorageSpy } from '@/data/test'
import { LocalSaveAccessToken } from './local-save-acess-token'

describe('LocalSaveAccessToken' , () => {
  test('Deve chamar SetStorage com valor correto', async () => {
    const spy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(spy)
    const accessToken = faker.random.words()
    await sut.save(accessToken)
    expect(spy.key).toBe('accessToken')
    expect(spy.value).toBe(accessToken)
  })
})
