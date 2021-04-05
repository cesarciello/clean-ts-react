
import faker from 'faker'

import { GetStorage } from '@/data/protocols/storage/get-storage'

export class GetStorageSpy implements GetStorage {
  key: string
  value: any = faker.random.objectElement()
  get(key: string): any {
    this.key = key
    return this.value
  }
}
