import React from 'react'
import { render , RenderResult ,fireEvent,cleanup } from '@testing-library/react'
import Login from './login'
import ValidationSpy from '@/presentation/test/mock-validation'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
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
    const emailFake = faker.internet.email()
    fireEvent.input(emailInput,{ target: { value: emailFake } })
    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(emailFake)
  })

  test('Should validate correct password' , () => {
    const { sut: { getByTestId } , validationSpy } = makeSut()
    const passwordInput = getByTestId('password')
    const passwordFaker = faker.internet.password()
    fireEvent.input(passwordInput,{ target: { value: passwordFaker } })
    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(passwordFaker)
  })
})
