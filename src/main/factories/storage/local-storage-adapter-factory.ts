import { LocalStorageAdapter } from '@/infra/storage/local-storage-adapter'

export const makeLocalStorageAdapterFactory = (): LocalStorageAdapter => {
  return new LocalStorageAdapter()
}
