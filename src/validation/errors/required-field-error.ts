export class RequiredFieldError extends Error {
  constructor () {
    super('Campo obrigatŕoio')
    this.name = 'RequiredFieldError'
  }
}
