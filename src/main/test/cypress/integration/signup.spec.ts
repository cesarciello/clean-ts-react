import faker from 'faker'
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

  it('should present error state if form is invalid', () => {
    FormHelper.input('name').type(faker.random.alphaNumeric(7))
    FormHelper.inputError('name').should('have.text', 'Min Length field is 10')
    FormHelper.input('email').type(faker.random.word())
    FormHelper.inputError('email').should('have.text', 'Invalid field email')
    FormHelper.input('password').type(faker.random.alphaNumeric(4))
    FormHelper.inputError('password').should('have.text', 'Min Length field is 5')
    FormHelper.input('passwordConfirmation').type(faker.random.alphaNumeric(4))
    FormHelper.inputError('passwordConfirmation').should('have.text', 'Invalid field password confirmation')
    FormHelper.submitButton().should('have.attr', 'disabled')
  })

  it('should present valid state if form is valid', () => {
    FormHelper.fillSignUpInputs()
    FormHelper.inputError('name').should('not.exist')
    FormHelper.inputError('email').should('not.exist')
    FormHelper.inputError('password').should('not.exist')
    FormHelper.inputError('passwordConfirmation').should('not.exist')
    FormHelper.inputWarp('name').should('have.attr', 'data-status', 'valid')
    FormHelper.inputWarp('email').should('have.attr', 'data-status', 'valid')
    FormHelper.inputWarp('password').should('have.attr', 'data-status', 'valid')
    FormHelper.inputWarp('passwordConfirmation').should('have.attr', 'data-status', 'valid')
    FormHelper.submitButton().should('not.have.attr', 'disabled')
    FormHelper.errorWarp().should('not.have.descendants')
  })
})
