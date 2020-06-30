import { InvalidEmailError } from '@/validation/errors'
import FieldValidation from '@/validation/protocol/field-validation'

class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {
  }

  validate (value: string): Error {
    return new InvalidEmailError()
  }
}

export default EmailValidation
