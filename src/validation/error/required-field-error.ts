
export class RequiredFieldError extends Error {
  constructor(field: string) {
    super(`Required field ${field}`)
    this.name = 'RequiredFieldError'
  }
}
