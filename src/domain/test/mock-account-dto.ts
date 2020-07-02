import { AccountDto } from '../models/account-dto'
import faker from 'faker'

export const mockAccountDto = (): AccountDto => {
  return {
    accessToken: faker.random.word(),
    uid: faker.random.word(),
    email: faker.internet.email(),
    client: faker.random.word()
  }
}
