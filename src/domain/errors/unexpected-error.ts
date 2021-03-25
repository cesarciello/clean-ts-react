export class UnexpectedError extends Error {
  constructor() {
    super('Unexpected error. Try again later')
    this.name = 'UnexpectedError'
  }
}
