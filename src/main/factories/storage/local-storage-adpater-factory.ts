import { LocalStorageAdpter } from '@/infra/storage/local-storage-adpater'

export const makeLocalStorageAdpterFactory = (): LocalStorageAdpter => {
  return new LocalStorageAdpter()
}
