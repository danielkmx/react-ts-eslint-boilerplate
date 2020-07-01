import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test/mock-field-validation'

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const validationSpy = new FieldValidationSpy('any_field')
    const validationSpy2 = new FieldValidationSpy('any_field')
    validationSpy2.error = new Error('any_error_message')
    const sut = ValidationComposite.build([
      validationSpy,
      validationSpy2
    ])
    const error = sut.validate('any_field','any_value')
    expect(error).toBe('any_error_message')
  })
  test('Should not return any error', () => {
    const validationSpy = new FieldValidationSpy('any_field')
    const validationSpy2 = new FieldValidationSpy('any_field')
    const sut = ValidationComposite.build([
      validationSpy,
      validationSpy2
    ])
    const error = sut.validate('any_field','any_value')
    expect(error).toBeFalsy()
  })
})
