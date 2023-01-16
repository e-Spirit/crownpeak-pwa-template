const baseUrl = Cypress.env("cyBaseUrl");

describe("home page up", () => {
  it(`test all links=> should render all body elements, return 200`, () => {
    cy.visit(baseUrl);
  });
});
