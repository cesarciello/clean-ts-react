export class MinLengthError extends Error {
  constructor(size: number) {
    super(`Min Length field is ${size}`)
    this.name = 'MinLengthError'
  }
}
