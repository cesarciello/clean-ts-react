
export class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`Required field ${field.split(/(?=[A-Z])/).join(' ')}`)
    this.name = 'RequiredFieldError'
  }
}
