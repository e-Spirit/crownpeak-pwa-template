const baseURL = Cypress.env('cyBaseURL')

describe(`routing.global.ts`, () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })
  it('navigate to / => redirect to index page', () => {
    // go to / and check if we are redirect to any other page than /
    cy.visit(`${baseURL}/`)
    cy.url().should('not.eq', `${baseURL}/`)
  })

  it('navigate to / with query+hash => redirect to index page and keep params', () => {
    cy.visit(`${baseURL}/?foo=bar#baz`)
    cy.url().should('not.eq', `${baseURL}/`)
    cy.url().should('contain', '?foo=bar')
    cy.url().should('contain', '#baz')
  })

  it('navigate to normal page with query+hash => do not redirect to index page and keep params', () => {
    cy.visit(`${baseURL}/Unsere-Lösungen/?foo=bar#baz`)
    cy.url().should('not.eq', `${baseURL}/`)
    cy.url().should('contain', '?foo=bar')
    cy.url().should('contain', '#baz')
  })

  it('navigate to normal page => render content', () => {
    cy.visit(`${baseURL}/Unsere-Lösungen`)
    cy.get('body').should('contain', 'Sicherheit für Ihr zu Hause')
  })

  it('navigate to / => render content', () => {
    cy.visit(`${baseURL}/`)
    cy.get('body').should(
      'contain',
      'Das vernetzte, „intelligente“ Heim sorgt für mehr Sicherheit, spart wertvolle Zeit und senkt Energiekosten.'
    )
  })

  it('navigate to non-existing page => show error page', () => {
    cy.intercept({
      method: 'GET',
      url: `${baseURL}/*`
    }).as('visit')
    cy.visit(`${baseURL}/thisdoesnotexist`, { failOnStatusCode: false })
    cy.wait('@visit').then(({ response }) => {
      if (!response) throw new Error('response should exist')
      expect(response.statusCode).to.eq(404)
    })
    // page should contain 404 somewhere
    cy.get('body').should('contain', '404')
  })

  // This covers a previous bug where the route would not match the seoRoute of the activeNavigationItem,
  // and therefore the user would be redirected to the seoRoute of the activeNavigationItem.
  it('navigate to content-projection page through deep link => should not redirect', () => {
    cy.visit(`${baseURL}/Produkte/Kabellose-Smart-Steckdose-NX-17.html`)
    cy.url().should(
      'eq',
      `${baseURL}/Produkte/Kabellose-Smart-Steckdose-NX-17.html`
    )

    // checks the breadcrumbs because product detail is not implemented yet.
    cy.get('body').should('contain', 'Kabellose-Smart-Steckdose-NX-17.html')
  })
})
