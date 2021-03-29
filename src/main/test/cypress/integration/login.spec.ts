import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    cy.getByTestId('email-error').should('have.text', 'Required field email')
    cy.getByTestId('password-error').should('have.text', 'Required field password')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-error').should('have.text', 'Invalid field email')
    cy.getByTestId('password').type(faker.random.alphaNumeric(4))
    cy.getByTestId('password-error').should('have.text', 'Min Length field is 5')
    cy.getByTestId('submit').should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-error').should('not.exist')
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('password-error').should('not.exist')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if credential invalid are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('errorMessage').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('errorMessage').should('have.text', 'Invalid Credentials')
  })

  it('should present error if credential invalid are provided', () => {
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('errorMessage').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('errorMessage').should('have.text', 'Invalid Credentials')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
