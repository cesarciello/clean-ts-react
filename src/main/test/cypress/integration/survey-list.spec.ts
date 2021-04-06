import faker from 'faker'
import { FormHelper, HttpHelper } from '../utils'

const baseUrl: string = Cypress.config().baseUrl

describe('SurveyList', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify({ accessToken: faker.random.uuid(), name: faker.name.findName() }))
  })

  it('should present error on UnexpectedError', () => {
    HttpHelper.mockUnexpectedRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
  })
})
