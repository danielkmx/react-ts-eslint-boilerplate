import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'
import EmailValidation from '../email/email-validation'
import { MinLengthValidation } from '../min-length/min-length-validation'

describe('ValidationBuilder', () => {
  test('Should return requiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
  test('Should return emailValidation', () => {
    const validations = sut.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
  test('Should return minLengthValidation', () => {
    const validations = sut.field('any_field').minLength(5).build()
    expect(validations).toEqual([new MinLengthValidation('any_field',5)])
  })
  test('Should return list of validations', () => {
    const validations = sut.field('any_field').minLength(5).email().required().build()
    expect(validations).toEqual([
      new MinLengthValidation('any_field',5),
      new EmailValidation('any_field'),
      new RequiredFieldValidation('any_field')])
  })
})
