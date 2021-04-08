const baseUrl: string = Cypress.config().baseUrl

describe('Private Routes', () => {
  it('should logout if survey-list has no token', () => {
    cy.visit('')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should logout if survey-result has no token', () => {
    cy.visit('/surveys/any_id/results')
    cy.url().should('eq', `${baseUrl}/login`)
  })
})
