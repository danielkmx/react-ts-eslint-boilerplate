import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalue', () => {
    const sut = new MinLengthValidation('field',5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should not return error if value is valid', () => {
    const sut = new MinLengthValidation('field',5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
