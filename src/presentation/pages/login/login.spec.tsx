import React from 'react'
import { render , RenderResult ,fireEvent ,waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Login from './login'
import 'jest-localstorage-mock'
import { ValidationStub,AuthenticationSpy } from '@/presentation/test/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}
type SutParams = {
  validationError: string
}
const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const errorMessage = params?.validationError
  validationStub.errorMessage = errorMessage
  const sut = render(
    <Router history={history}>
      <Login authentication={authenticationSpy} validation={validationStub} />
    </Router>
  )
  return {
    sut,
    validationStub,
    authenticationSpy
  }
}
const simulateValidSubmit = (sut: RenderResult,validationStub, email = faker.internet.email() , password = faker.internet.password()): void => {
  const { getByTestId } = sut
  validationStub.errorMessage = null
  populateEmail(sut,email)
  populatePassword(sut,password)
  const submitButton = getByTestId('submit')
  fireEvent.click(submitButton)
}
const populateEmail = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput,{ target: { value: email } })
}
const populatePassword = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput,{ target: { value: password } })
}

describe('Login component' , () => {
  beforeEach(() => {
    localStorage.clear()
  })
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
    const { sut, validationStub } = makeSut({ validationError })
    const { getByTestId } = sut
    populateEmail(sut)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show error message on passwordError' , () => {
    const validationError = faker.random.words()
    const { sut , validationStub } = makeSut({ validationError })
    const { getByTestId } = sut
    populatePassword(sut)
    const emailStatus = getByTestId('password-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show valid password state if Vadalidation succeds' , () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    populatePassword(sut)
    const emailStatus = getByTestId('password-status')
    expect(emailStatus.title).toBe('')
  })

  test('Should show valid password state if Vadalidation succeds' , () => {
    const { sut , validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    populateEmail(sut)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('')
  })
  test('Should enable submit button if form is valid' , () => {
    const { sut , validationStub } = makeSut()
    const { getByTestId } = sut
    validationStub.errorMessage = null
    populateEmail(sut)
    populatePassword(sut)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test('Should show spinner on submit' , () => {
    const { sut, validationStub } = makeSut()
    const { getByTestId } = sut
    simulateValidSubmit(sut,validationStub)
    const spinner = getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  test('Should call auth with correct values' , () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut,validationStub,email,password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
  test('Should call auth only once' , () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = null
    simulateValidSubmit(sut,validationStub)
    simulateValidSubmit(sut,validationStub)

    expect(authenticationSpy.callsCount).toBe(1)
  })
  test('Should not call auth if form is invalid' , () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    validationStub.errorMessage = faker.random.words()
    populateEmail(sut)
    fireEvent.submit(sut.getByTestId('form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })
  // test('mostrar erro caso autenticacao falhe' , async () => {
  //   const { sut, validationStub, authenticationSpy } = makeSut()
  //   const error = new InvalidCredentialsError()
  //   jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
  //   const errorWrap = sut.getByTestId('error-wrap')
  //   await waitFor(() => errorWrap)
  //   act(() => {
  //     simulateValidSubmit(sut,validationStub)
  //   })
  //   const mainError = sut.getByTestId('main-error')
  //   expect(mainError.textContent).toBe(error.message)

  //   expect(errorWrap.childElementCount).toBe(1)
  // })
  test('Should add accessToken to localstorage on sucess' , async () => {
    const { sut, validationStub, authenticationSpy } = makeSut()
    simulateValidSubmit(sut,validationStub)
    await waitFor(() => sut.getByTestId('form'))
    expect(localStorage.setItem).toHaveBeenLastCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })
  test('Should go to signUp page' , async () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
