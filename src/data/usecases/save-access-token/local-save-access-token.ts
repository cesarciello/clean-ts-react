import { SetStorage } from '@/data/protocols/storage/set-storage'
import { SaveAccessToken } from '@/domain/usecases/save-acess-token'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly setStorage: SetStorage) { }

  async save(accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
