import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('loginValidationFactory',() => {
  test('Deve criar ValidationComposite com valores corretos', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...ValidationBuilder.field('email').required().email().build(),
      ...ValidationBuilder.field('password').required().minLength(5).build()
    ]))
  })
})
