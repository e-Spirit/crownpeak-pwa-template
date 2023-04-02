import sitemapXMLItems from '../../fixtures/sitemap.json'

const baseURL = Cypress.env('cyBaseURL')

describe(`sitemap`, () => {
  it('open sitemap route => display navigation data', () => {
    cy.request(`${baseURL}/sitemap.xml`).then((response) => {
      sitemapXMLItems.forEach((item) => {
        expect(response.body).to.include(item)
      })
    })
  })
})

export {}
