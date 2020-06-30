import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const validationSpy = new FieldValidationSpy('any_field')
    const validationSpy2 = new FieldValidationSpy('any_field')
    validationSpy2.error = new Error('any_error_message')
    const sut = new ValidationComposite([
      validationSpy,
      validationSpy2
    ])
    const error = sut.validate('any_field','any_value')
    expect(error).toBe('any_error_message')
  })
  test('Should return error if any validation fails', () => {
    const validationSpy = new FieldValidationSpy('any_field')
    const validationSpy2 = new FieldValidationSpy('any_field')
    const sut = new ValidationComposite([
      validationSpy,
      validationSpy2
    ])
    const error = sut.validate('any_field','any_value')
    expect(error).toBeFalsy()
  })
})
