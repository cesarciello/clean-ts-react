import faker from 'faker'
import { FormHelper, HttpHelper } from '../utils'

const baseUrl: string = Cypress.config().baseUrl
const accoutInLocalStorage = { accessToken: faker.random.uuid(), name: faker.name.findName() }

describe('SurveyList', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify(accoutInLocalStorage))
  })

  it('should present error on UnexpectedError', () => {
    HttpHelper.mockUnexpectedRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
  })

  it('should present logout on AccessDeniedError', () => {
    HttpHelper.mockForbbidenRequest(/surveys/)
    cy.visit('')
    cy.url().should('eq', `${baseUrl}/login`)
    cy.window().then(window => assert.isNotOk(window.localStorage.getItem('account')))
  })

  it('should logout on logout link click', () => {
    HttpHelper.mockForbbidenRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('logout').click()
    cy.url().should('eq', `${baseUrl}/login`)
    cy.window().then(window => assert.isNotOk(window.localStorage.getItem('account')))
  })

  it('should present correct username in header', () => {
    HttpHelper.mockForbbidenRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('username').should('contain.text', accoutInLocalStorage.name)
  })
})
