import faker from 'faker'
import 'jest-localstorage-mock'

import { LocalStorageAdpter } from './local-storage-adpater'

type SutTypes = {
  sut: LocalStorageAdpter
}

const makeSut = (): SutTypes => {
  const sut = new LocalStorageAdpter()
  return {
    sut
  }
}
describe('LocalStorageAdpter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should calls localStorage with correct values', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.random.word()
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, value)
  })
})
