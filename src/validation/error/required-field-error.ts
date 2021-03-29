
export class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`Required field ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`)
    this.name = 'RequiredFieldError'
  }
}
