import { SetStorage } from '@/data/protocols/storage/set-storage'

export class LocalStorageAdpter implements SetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
