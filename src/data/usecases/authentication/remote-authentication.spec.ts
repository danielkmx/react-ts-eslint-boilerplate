import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/test/mock-http-client'
import faker from 'faker'
import { mockAuthentication, mockAccountModel } from '@/domain/test/mock-account'
import { InvalidCredentialsError , UnexpectedError } from '@/domain/errors'
import { HttpStatusCode } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models/account-models'
import { AuthenticationParams } from '@/domain/usecases/authentication'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>
}
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>()
  const sut = new RemoteAuthentication(httpPostClientSpy, url)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('Remote Auth', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    httpPostClientSpy.response = {
      ...mockAccountModel(),
      statusCode: HttpStatusCode.ok
    }
    const authParams = mockAuthentication()
    await sut.auth(authParams)
    expect(httpPostClientSpy.body).toEqual(authParams)
  })
  test('Should throw invalidCredentials Error if HttpPostCLient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      ...mockAccountModel(),
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
  test('Should throw unexpected error Error if HttpPostCLient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      ...mockAccountModel(),
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error Error if HttpPostCLient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      ...mockAccountModel(),
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should throw unexpected error Error if HttpPostCLient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      ...mockAccountModel(),
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
  test('Should return account Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const accountModelMock = mockAccountModel()
    httpPostClientSpy.response = {
      ...accountModelMock,
      statusCode: HttpStatusCode.ok
    }
    const accountDto = {
      accessToken: accountModelMock.headers['access-token'],
      uid: accountModelMock.body.data.uid,
      email: accountModelMock.body.data.email,
      client: accountModelMock.headers.client
    }
    const account = await sut.auth(mockAuthentication())

    await expect(account).toEqual(accountDto)
  })
})
