export class InavlidFieldError extends Error {
  constructor(field: string) {
    super(`Invalid field ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`)
    this.name = 'InavlidFieldError'
  }
}
