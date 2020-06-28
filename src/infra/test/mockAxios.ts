import axios from 'axios'
import faker from 'faker'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  const mockedAxiosResult = {
    status: faker.random.number(),
    data: faker.random.objectElement()
  }
  mockedAxios.post.mockResolvedValue(mockedAxiosResult)
  return mockedAxios
}