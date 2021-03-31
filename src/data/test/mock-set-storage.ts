import { SetStorage } from '../protocols/storage/set-storage'

export class SetStorageMock implements SetStorage {
  key: string
  value: string

  set(key: string, value: string): void {
    this.key = key
    this.value = value
  }
}
