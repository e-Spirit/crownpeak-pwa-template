const baseURL = Cypress.env('cyBaseURL')

describe(`slug page`, () => {
  it('navigate to page => render content', () => {
    cy.visit(`${baseURL}/unsere-loesungen/`)
    cy.get('body').should('contain', 'Unsere Lösungen')
  })

  it("navigate back and forth => don't make new network calls for cached content", () => {
    cy.intercept({
      method: 'GET',
      url: '/api/elements'
    }).as('fetchContent')

    cy.intercept({
      method: 'GET',
      url: '/api/filters'
    }).as('fetchByFilter')

    cy.intercept({
      method: 'GET',
      url: '/api/navigation'
    }).as('fetchNavigation')

    cy.intercept({
      method: 'GET',
      url: '/api/properties'
    }).as('fetchProperties')

    cy.visit(`${baseURL}`)
    cy.get('[href="/standorte/"]').click()
    cy.get('[href="/unsere-loesungen/"]').click()
    cy.get('[href="/standorte/"]').click()
    cy.wait(3000)

    // newtwork calls happen once on the server
    cy.get('@fetchContent').should('eq', null)
    cy.get('@fetchByFilter').should('eq', null)
    cy.get('@fetchNavigation').should('eq', null)
    cy.get('@fetchProperties').should('eq', null)
  })

  it('navigate to content projection => display content', () => {
    cy.visit(`${baseURL}/products/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')
  })

  it('click back button to content projection => display same content', () => {
    cy.visit(`${baseURL}/products/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')
    cy.get('[href="/our-solutions/"]').click()
    cy.url().should('eq', `${baseURL}/our-solutions/`)

    // wait until content is displayed
    cy.contains('Smart Solutions')

    cy.go('back')
    cy.url().should('eq', `${baseURL}/products/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')
  })

  it('refresh content projection page => display same content', () => {
    cy.visit(`${baseURL}/products/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')
    cy.reload()
    cy.url().should('eq', `${baseURL}/products/goomazon-oklexa-sp93.html`)
    cy.get('[data-testid=productSection]').should('contain', 'The Oklexa SP93')
  })

  it('navigate to non-existing content projection => display 404', () => {
    cy.request({
      url: `${baseURL}/products/goomazon-oklexa.html`,
      failOnStatusCode: false
    })
      .its('status')
      .should('equal', 404)
  })

  it.skip('fail to fetch navigation => display error', () => {
    // this test doesn't work with the new first spirit project because there is no request to /api/navigation to intercept
    cy.intercept('POST', '/api/navigation', {
      statusCode: 500
    }).as('fetchNavigation')

    cy.visit(`${baseURL}/unsere-loesungen/`)

    cy.get('body').should('contain', 'Error')
  })
})

export {}
