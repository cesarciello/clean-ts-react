import faker from 'faker'

export const mockForbbidenRequest = (url: RegExp): void => (mockHttpRequest(url, 403, { error: faker.random.word() }))
export const mockInvalidCredentialsRequest = (url: RegExp): void => (mockHttpRequest(url, 401, { error: faker.random.word() }))
export const mockUnexpectedRequest = (url: RegExp): void => (mockHttpRequest(url, faker.helpers.randomize([400, 404, 500]), { error: faker.random.word() }))

export const mockSurveyListFixtures = (): void => mockHttpRequestWithFixtures(/surveys/, 200, 'survey-list')

export const mockSurveyResultFixtures = (path: RegExp): void => mockHttpRequestWithFixtures(path, 200, 'survey-result')

export const mockLoginNoDataRequest = (url: RegExp): void => (mockHttpRequest(url, 200))
export const mockLoginRequestFixtures = (url: RegExp): void => (mockHttpRequestWithFixtures(url, 200, 'account'))

const mockHttpRequest = (url: RegExp, statusCode: number, body?: any): void => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send({ statusCode, body })
    })
  }).as('request')
}

const mockHttpRequestWithFixtures = (url: RegExp, statusCode: number, fixture: string): void => {
  cy.intercept(url, (req) => {
    req.reply((res) => {
      res.send({ statusCode, fixture: `${fixture}.json` })
    })
  }).as('request')
}
