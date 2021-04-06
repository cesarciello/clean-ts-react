import faker from 'faker'
import { FormHelper, HttpHelper } from '../utils'

const baseUrl: string = Cypress.config().baseUrl
const accoutInLocalStorage = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }

describe('SurveyList', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify(accoutInLocalStorage))
  })

  it('should present error on UnexpectedError', () => {
    HttpHelper.mockUnexpectedRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
  })

  it('should reload on button click', () => {
    HttpHelper.mockUnexpectedRequest(/surveys/)
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
    HttpHelper.mockSurveyListFixtures()
    cy.getByTestId('reload').click()
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
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

  it('should present surveyItems', () => {
    HttpHelper.mockSurveyListFixtures()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '04')
      assert.equal(li.find('[data-testid="month"]').text(), 'abr')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="question"]').text(), 'question 1 ?')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '05')
      assert.equal(li.find('[data-testid="month"]').text(), 'abr')
      assert.equal(li.find('[data-testid="year"]').text(), '2021')
      assert.equal(li.find('[data-testid="question"]').text(), 'question 2 ?')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
  })
})
