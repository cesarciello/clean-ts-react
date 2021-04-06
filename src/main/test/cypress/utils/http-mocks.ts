import faker from 'faker'

export const mockInvalidCredentialsRequest = (url: RegExp): void => (mockHttpRequest(url, 401, { error: faker.random.word() }))
export const mockForbbidenRequest = (url: RegExp): void => (mockHttpRequest(url, 403, { error: faker.random.word() }))
export const mockUnexpectedRequest = (url: RegExp): void => (mockHttpRequest(url, faker.helpers.randomize([400, 404, 500]), { error: faker.random.word() }))
export const mockLoginRequest = (url: RegExp): void => (mockHttpRequest(url, 200, 'fx:account'))
export const mockLoginNoDataRequest = (url: RegExp): void => (mockHttpRequest(url, 200))

const mockHttpRequest = (url: RegExp, statusCode: number, body?: any): void => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send({ statusCode, body })
    })
  }).as('request')
}
