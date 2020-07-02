import { AuthenticationParams } from '@/domain/usecases/authentication'
import faker from 'faker'
import { AccountModel } from '../models/account-models'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  body: {
    data: {
      email: faker.random.word(),
      uid: faker.random.uuid()
    }
  },
  headers: {
    'access-token': faker.random.uuid() ,
    client: faker.random.uuid()
  }

})
