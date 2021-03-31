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

  test('should calls localStorage.setItem with correct values', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{ name: string }>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenLastCalledWith(key, JSON.stringify(value))
  })

  test('should calls localStorage.getItem with correct values', async () => {
    const { sut } = makeSut()
    const key = faker.database.column()
    const value = faker.random.objectElement<{ name: string }>()
    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))
    const storageResponse = sut.get(key)
    expect(storageResponse).toEqual(value)
    expect(getItemSpy).toHaveBeenLastCalledWith(key)
  })
})
