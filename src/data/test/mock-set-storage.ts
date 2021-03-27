import { SetStorage } from '../protocols/storage/set-storage'

export class SetStorageMock implements SetStorage {
  key: string
  value: string

  async set(key: string, value: string): Promise<void> {
    this.key = key
    this.value = value
  }
}
