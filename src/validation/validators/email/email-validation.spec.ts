import { InvalidEmailError } from '@/validation/errors'
import EmailValidation from './email-validation'
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidEmailError())
  })
  test('Should not return error if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
