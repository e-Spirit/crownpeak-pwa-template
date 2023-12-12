export {}
describe(`locale switching`, () => {
  const baseURL = Cypress.env('cyBaseURL')
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('change language on /startseite/ => redirect /homepage/', () => {
    cy.visit(`${baseURL}/startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/homepage/`)
  })

  it('change language, navigate back => change language back', () => {
    cy.visit(`${baseURL}/startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/homepage/`)
    cy.go('back')

    cy.url().should('eq', `${baseURL}/startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").should(
      'have.attr',
      'data-activeLocale',
      'true'
    )
  })

  it('change language => change content', () => {
    cy.visit(`${baseURL}/startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/homepage/`)

    cy.get('body').should('contain', 'Welcome')
  })

  it('change language => highlight active language', () => {
    cy.visit(`${baseURL}/startseite/`)
    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").should(
      'have.class',
      'underline'
    )

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").should(
      'not.have.class',
      'underline'
    )

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/homepage/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").should(
      'have.class',
      'underline'
    )

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").should(
      'not.have.class',
      'underline'
    )
  })

  it('change language on content projection => change route and content', () => {
    cy.visit(`${baseURL}/products/goomazon-oklexa-sp93.html`)

    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").click()

    cy.url().should('eq', `${baseURL}/produkte/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'Die Oklexa SP93')
  })
})
