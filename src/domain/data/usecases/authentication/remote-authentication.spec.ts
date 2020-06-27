import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '../../test/mock-http-client'

describe('Remote Auth' ,() => {
  test('Should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const httpClient = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(httpClient,url)
    await sut.auth()
    expect(httpClient.url).toBe(url)
  })
})
