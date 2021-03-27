import { SetStorage } from '@/data/protocols/storage/set-storage'

export class LocalStorageAdpter implements SetStorage {
  async set(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value)
  }
}
