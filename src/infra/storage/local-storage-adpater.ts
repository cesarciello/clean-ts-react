import { SetStorage } from '@/data/protocols/storage/set-storage'

export class LocalStorageAdpter implements SetStorage {
  set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }
}
