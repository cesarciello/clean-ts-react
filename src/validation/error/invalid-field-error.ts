export class InavlidFieldError extends Error {
  constructor(field: string) {
    super(`Invalid field ${field}`)
    this.name = 'InavlidFieldError'
  }
}
