import FieldValidation from '@/validation/protocol/field-validation'
import { InvalidFieldError } from '@/validation/errors'

class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (value: string): Error {
    return new InvalidFieldError()
  }
}

describe('MinLengthValidation', () => {
  test('Should return error if valid is invalue', () => {
    const sut = new MinLengthValidation('field',5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
