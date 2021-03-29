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

  it('should present InvalidCredentialsError on 401', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 401, body: { error: faker.random.word() } })
        res.delay(1000)
      })
    })
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

  it('should present UnexpectedError on 400', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 400, body: { error: faker.random.word() } })
        res.delay(1000)
      })
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('errorMessage').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('errorMessage').should('have.text', 'Unexpected error. Try again later')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on data response is invalid', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 200, body: { xxx: faker.random.uuid() } })
        res.delay(1000)
      })
    })
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password()).type('{enter}')
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('exist')
      .getByTestId('errorMessage').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('errorMessage').should('have.text', 'Unexpected error. Try again later')
    cy.window().then(window => assert.isNull(window.localStorage.getItem('accessToken')))
  })

  it('should prevent submit call only once', () => {
    cy.intercept(/login/, (req) => {
      req.reply((res) => {
        res.send({ statusCode: 200, body: { accessToken: faker.random.uuid() } })
        res.delay(1000)
      })
    }).as('request')
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').type(faker.internet.password())
    cy.getByTestId('submit').click()
    cy.getByTestId('submit').click()
    cy.get('@request.all').should('have.length', 1)
  })
})
