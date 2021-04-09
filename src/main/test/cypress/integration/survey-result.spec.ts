import faker from 'faker'
import { HttpHelper } from '../utils'

const path = /fordevs.herokuapp.com\/api\/surveys/
const accoutInLocalStorage = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }

describe('SurveyResult', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify(accoutInLocalStorage))
  })

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
})
