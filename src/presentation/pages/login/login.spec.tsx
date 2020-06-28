import React from 'react'
import { render , RenderResult ,fireEvent,cleanup } from '@testing-library/react'
import Login from './login'
import { Validation } from '@/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}
class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy
  }
}

describe('Login component' , () => {
  afterEach(cleanup)
  test('Should start with initial state' , () => {
    const { sut: { getByTestId } } = makeSut()
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('Campo obrigatório')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('Campo obrigatório')
  })

  test('Should validate correct email' , () => {
    const { sut: { getByTestId } , validationSpy } = makeSut()
    const emailInput = getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: 'any_email' } })
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    })
  })

  test('Should validate correct password' , () => {
    const { sut: { getByTestId } , validationSpy } = makeSut()
    const passwordInput = getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: 'any_password' } })
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    })
  })
})
