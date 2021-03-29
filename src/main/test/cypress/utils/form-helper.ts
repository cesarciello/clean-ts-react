import faker from 'faker'

export const inputWarp = (field: string): Cypress.Chainable => (cy.getByTestId(`${field}-input-warp`))
export const inputError = (field: string): Cypress.Chainable => (cy.getByTestId(`${field}-error`))
export const input = (field: string): Cypress.Chainable => (cy.getByTestId(`${field}`))
export const submitButton = (): Cypress.Chainable => (cy.getByTestId('submit'))
export const errorWarp = (): Cypress.Chainable => (cy.getByTestId('error-wrap'))

export const submitFormLogin = (): void => {
  fillLoginInputs()
  submitButton().click()
}
export const fillLoginInputs = (): void => {
  input('email').type(faker.internet.email())
  input('password').type(faker.internet.password())
}
export const ifErrorFlowErrorWarp = (error: string): void => {
  errorWarp()
    .getByTestId('spinner').should('exist')
    .getByTestId('errorMessage').should('not.exist')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('errorMessage').should('have.text', error)
}

export const fillSignUpInputs = (): void => {
  const password = faker.internet.password()
  input('name').type(faker.random.alphaNumeric(11))
  input('email').type(faker.internet.email())
  input('password').type(password)
  input('passwordConfirmation').type(password)
}
export const submitFormSingup = (): void => {
  fillSignUpInputs()
  submitButton().click()
}
