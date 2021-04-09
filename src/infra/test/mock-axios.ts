
import axios from 'axios'
import faker from 'faker'

export const mockHttpAxiosResponse = (): any => ({
  status: faker.datatype.number(),
  data: faker.random.objectElement()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpAxiosResponse())
  return mockedAxios
}
