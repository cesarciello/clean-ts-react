import { SaveAccessToken } from '@/domain/usecases/save-acess-token'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { makeLocalStorageAdpterFactory } from '@/main/factories/storage/local-storage-adpater-factory'

export const makeLocalSaveAccessTokenFactory = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdpterFactory())
}
