import faker from 'faker'

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
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('password-error').should('have.text', 'Min Length field is 5')
  })
})
