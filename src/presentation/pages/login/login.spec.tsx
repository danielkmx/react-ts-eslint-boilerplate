import React from 'react'
import { render , RenderResult ,fireEvent,cleanup } from '@testing-library/react'
import Login from './login'
import ValidationStub from '@/presentation/test/mock-validation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}
type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const errorMessage = params?.validationError
  validationStub.errorMessage = errorMessage
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
    validationStub
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
})
