import FieldValidation from './protocol/field-validation'
import { RequiredFieldError } from '../errors'

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {

  }

  validate (value: string): Error {
    return value ? null : new RequiredFieldError()
  }
}

export default RequiredFieldValidation
