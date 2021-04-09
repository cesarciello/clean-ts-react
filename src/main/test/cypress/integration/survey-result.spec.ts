import faker from 'faker'
import { HttpHelper } from '../utils'

const baseUrl: string = Cypress.config().baseUrl
const path = /fordevs.herokuapp.com\/api\/surveys/
const accoutInLocalStorage = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }

describe('SurveyResult', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify(accoutInLocalStorage))
  })

  describe('load', () => {
    it('should present error on UnexpectedError', () => {
      HttpHelper.mockUnexpectedRequest(path)
      cy.visit('surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
    })

    it('should reload on button click', () => {
      HttpHelper.mockUnexpectedRequest(path)
      cy.visit('surveys/any_id')
      cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
      HttpHelper.mockSurveyResultFixtures(path)
      cy.getByTestId('reload').click()
      cy.getByTestId('question').should('have.text', 'Question ?')
      cy.get('li:not(:empty)').should('have.length', 2)
    })

    it('should present logout on AccessDeniedError', () => {
      HttpHelper.mockForbbidenRequest(path)
      cy.visit('surveys/any_id')
      cy.url().should('eq', `${baseUrl}/login`)
      cy.window().then(window => assert.isNotOk(window.localStorage.getItem('account')))
    })

    it('should present surveyResult items', () => {
      HttpHelper.mockSurveyResultFixtures(path)
      cy.visit('surveys/any_id')
      cy.get('section:empty').should('exist')
      cy.get('li:not(:empty)').should('have.length', 2)
      cy.getByTestId('day').should('have.text', '05')
      cy.getByTestId('month').should('have.text', 'abr')
      cy.getByTestId('year').should('have.text', '2021')
      cy.get('li:nth-child(1)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'answer 1 ?')
        assert.equal(li.find('[data-testid="percent"]').text(), '100%')
        assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image')
      })

      cy.get('li:nth-child(2)').then(li => {
        assert.equal(li.find('[data-testid="answer"]').text(), 'answer 2 ?')
        assert.equal(li.find('[data-testid="percent"]').text(), '0%')
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })

    it('should redirect to survey list page on back button click', () => {
      cy.visit('')
      HttpHelper.mockSurveyResultFixtures(path)
      cy.visit('surveys/any_id')
      cy.getByTestId('back-button').click()
      cy.wait('@request')
      cy.url().should('eq', `${baseUrl}/`)
    })
  })

  describe('save', () => {
    beforeEach(() => {
      HttpHelper.mockSurveyResultFixtures(path)
      cy.visit('surveys/any_id')
      cy.wait('@request')
    })

    it('should present error on UnexpectedError', () => {
      HttpHelper.mockUnexpectedRequest(path)
      cy.get('li:nth-child(2)').click()
      cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
    })

    it('should present logout on AccessDeniedError', () => {
      HttpHelper.mockForbbidenRequest(path)
      cy.get('li:nth-child(2)').click()
      cy.url().should('eq', `${baseUrl}/login`)
      cy.window().then(window => assert.isNotOk(window.localStorage.getItem('account')))
    })
  })
})
