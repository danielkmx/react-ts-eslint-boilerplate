import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import EmailValidation from '../email/email-validation'

describe('ValidationBuilder', () => {
  test('Should return requiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  test('Should return emailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
