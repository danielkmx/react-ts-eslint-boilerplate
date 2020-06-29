import React from 'react'
import { render , RenderResult ,fireEvent,cleanup } from '@testing-library/react'
import Login from './login'
import ValidationStub from '@/presentation/test/mock-validation'
import faker from 'faker'
import { AuthenticationParams, Authentication } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}
type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const errorMessage = params?.validationError
  validationStub.errorMessage = errorMessage
  const sut = render(<Login authentication={authenticationSpy} validation={validationStub} />)
  return {
    sut,
    validationStub,
    authenticationSpy
  }
}

describe('Login component' , () => {
  afterEach(cleanup)
  test('Should start with initial state' , () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } , validationStub } = makeSut({ validationError })
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
    expect(emailStatus.textContent).toBe(validationStub.errorMessage)
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.textContent).toBe(validationStub.errorMessage)
  })

  test('Should show error message on emailError' , () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } , validationStub } = makeSut({ validationError })

    const emailInput = getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show error message on passwordError' , () => {
    const validationError = faker.random.words()
    const { sut: { getByTestId } , validationStub } = makeSut({ validationError })

    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('password-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show valid password state if Vadalidation succeds' , () => {
    const { sut: { getByTestId } , validationStub } = makeSut()
    validationStub.errorMessage = null
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('password-status')
    expect(emailStatus.title).toBe('')
  })

  test('Should show valid password state if Vadalidation succeds' , () => {
    const { sut: { getByTestId } , validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('')
  })
  test('Should enable submit button if form is valid' , () => {
    const { sut: { getByTestId } , validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput,{ target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit' , () => {
    const { sut: { getByTestId } , validationStub } = makeSut()
    validationStub.errorMessage = null
    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    fireEvent.input(passwordInput,{ target: { value: faker.internet.password() } })
    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)
    const spinner = getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call auth with correct values' , () => {
    const { sut: { getByTestId } , validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    const email = faker.internet.email()
    const password = faker.internet.password()
    const emailInput = getByTestId('email')
    const passwordInput = getByTestId('password')
    fireEvent.input(emailInput,{ target: { value: email } })
    fireEvent.input(passwordInput,{ target: { value: password } })
    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
