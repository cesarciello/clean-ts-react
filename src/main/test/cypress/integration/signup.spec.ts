import { FormHelper, HttpHelper } from '../utils'

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    FormHelper.inputWarp('email').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputWarp('password').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputWarp('name').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputWarp('passwordConfirmation').should('have.attr', 'data-status', 'invalid')
    FormHelper.inputError('email').should('have.text', 'Required field email')
    FormHelper.inputError('password').should('have.text', 'Required field password')
    FormHelper.inputError('name').should('have.text', 'Required field name')
    FormHelper.inputError('passwordConfirmation').should('have.text', 'Required field password confirmation')
    FormHelper.submitButton().should('have.attr', 'disabled')
    FormHelper.errorWarp().should('not.have.descendants')
  })
})
