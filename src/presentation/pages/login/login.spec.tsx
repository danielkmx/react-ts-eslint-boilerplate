import React from 'react'
import { render , RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login component' , () => {
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
})
