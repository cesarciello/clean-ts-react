import faker from 'faker'
import { HttpPostClient } from '../protocols/http'

export const mockPostRequest = (): HttpPostClient.Params<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
