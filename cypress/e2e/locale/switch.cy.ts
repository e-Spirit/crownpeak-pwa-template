export {}
describe(`locale switching`, () => {
  const baseURL = Cypress.env('cyBaseURL')
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('change language on /Startseite/ => redirect /Home/', () => {
    cy.visit(`${baseURL}/Startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/Home/`)
  })

  it('change language, navigate back => change language back', () => {
    cy.visit(`${baseURL}/Startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/Home/`)
    cy.go('back')

    cy.url().should('eq', `${baseURL}/Startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']")
      .should('be.visible')
      .should('have.attr', 'data-activeLocale', 'true')
  })

  it('change language => change content', () => {
    cy.visit(`${baseURL}/Startseite/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/Home/`)

    cy.get('body').should('contain', 'Welcome')
  })

  it('change language => highlight active language', () => {
    cy.visit(`${baseURL}/Startseite/`)
    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']")
      .should('be.visible')
      .should('have.class', 'underline')

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").should('be.visible')

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']").click()

    cy.url().should('eq', `${baseURL}/Home/`)

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='en_GB-switch']")
      .should('be.visible')
      .should('have.class', 'underline')

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").should('be.visible')
  })

  it('change language on content projection => change route and content', () => {
    cy.visit(`${baseURL}/Products/Goomazon-Oklexa-SP93.html`)

    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')

    cy.get("div[data-testid='languagesDropdown']").invoke('show')
    cy.get("button[data-testid='de_DE-switch']").click()

    cy.url().should('eq', `${baseURL}/Produkte/Goomazon-Oklexa-SP93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'Die Oklexa SP93')
  })
})
