export class EmailInUseError extends Error {
  constructor() {
    super('Email alredy in use')
    this.name = 'EmailInUseError'
  }
}
