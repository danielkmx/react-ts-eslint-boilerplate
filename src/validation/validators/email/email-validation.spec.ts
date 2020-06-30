import { InvalidEmailError } from '@/validation/errors'
import EmailValidation from './email-validation'
import faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.random.words())
    const error = sut.validate('')
    expect(error).toEqual(new InvalidEmailError())
  })
  test('Should not return error if email is valid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
