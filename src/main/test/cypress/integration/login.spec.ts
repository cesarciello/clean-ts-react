import faker from 'faker'
import { FormHelper, HttpHelper } from '../utils'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    FormHelper.inputWrap('email').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputWrap('password').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputError('email').should('have.text', 'Required field email')
    FormHelper.inputError('password').should('have.text', 'Required field password')
    FormHelper.submitButton().should('have.attr', 'disabled')
    FormHelper.errorWrap().should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    FormHelper.input('email').type(faker.random.word())
    FormHelper.inputError('email').should('have.text', 'Invalid field email')
    FormHelper.input('password').type(faker.random.alphaNumeric(4))
    FormHelper.inputError('password').should('have.text', 'Min Length field is 5')
    FormHelper.submitButton().should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    FormHelper.fillLoginInputs()
    FormHelper.inputError('email-error').should('not.exist')
    FormHelper.inputError('password').should('not.exist')
    FormHelper.inputWrap('email').should('have.attr', 'data-status', 'valid')
    FormHelper.inputWrap('password').should('have.attr', 'data-status', 'valid')
    FormHelper.submitButton().should('not.have.attr', 'disabled')
    FormHelper.errorWrap().should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    HttpHelper.mockInvalidCredentialsRequest(/login/)
    FormHelper.submitFormLogin()
    FormHelper.ifErrorFlowErrorWrap('Invalid Credentials')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on 400', () => {
    HttpHelper.mockUnexpectedRequest(/login/)
    FormHelper.submitFormLogin()
    FormHelper.ifErrorFlowErrorWrap('Unexpected error. Try again later')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on data response is invalid', () => {
    HttpHelper.mockLoginNoDataRequest(/login/)
    FormHelper.submitFormLogin()
    FormHelper.ifErrorFlowErrorWrap('Unexpected error. Try again later')
    cy.window().then(window => assert.isNull(window.localStorage.getItem('account')))
  })

  it('should prevent submit call only once', () => {
    HttpHelper.mockLoginRequest(/login/)
    FormHelper.submitFormLogin()
    FormHelper.submitButton().click()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should not call submit if invalid form', () => {
    HttpHelper.mockLoginRequest(/login/)
    FormHelper.input('email').type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })

  it('should navegate and UpdateCurrentAccount on success', () => {
    HttpHelper.mockLoginRequest(/login/)
    FormHelper.submitFormLogin()
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('account')))
  })
})
