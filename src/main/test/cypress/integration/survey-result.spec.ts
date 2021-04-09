import faker from 'faker'
import { HttpHelper } from '../utils'

const accoutInLocalStorage = { accessToken: faker.datatype.uuid(), name: faker.name.findName() }

describe('SurveyResult', () => {
  beforeEach(() => {
    localStorage.setItem('account', JSON.stringify(accoutInLocalStorage))
  })

  it('should present error on UnexpectedError', () => {
    HttpHelper.mockUnexpectedRequest(/fordevs.herokuapp.com\/api\/surveys/)
    cy.visit('surveys/any_id')
    cy.getByTestId('error').should('contain.text', 'Unexpected error. Try again later')
  })
})
