import { HttpPostParams } from '../protocols/http/http-post.client'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  data: {
    body: { name: 'random' },
    headers: { Authorization: '321321312' }
  }

})
