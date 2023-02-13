const baseURL = Cypress.env("cyBaseURL");

describe(`routing.global.ts`, () => {
  beforeEach(() => {
    cy.visit(baseURL);
  });
  it("navigate to / => redirect to index page", () => {
    // go to / and check if we are redirect to any other page than /
    cy.visit(`${baseURL}/`);
    cy.url().should("not.eq", `${baseURL}/`);
  });

  it("navigate to / with query+hash => redirect to index page and keep params", () => {
    cy.visit(`${baseURL}/?foo=bar#baz`);
    cy.url().should("not.eq", `${baseURL}/`);
    cy.url().should("contain", "?foo=bar");
    cy.url().should("contain", "#baz");
  });

  it("navigate to normal page with query+hash => redirect to index page and keep params", () => {
    cy.visit(`${baseURL}/Unsere-Lösungen/?foo=bar#baz`);
    cy.url().should("not.eq", `${baseURL}/`);
    cy.url().should("contain", "?foo=bar");
    cy.url().should("contain", "#baz");
  });

  it("navigate to normal page => render content", () => {
    cy.visit(`${baseURL}/Unsere-Lösungen`);
    cy.get("body").should("contain", "Unsere Lösungen");
  });

  it("navigate to / => render content", () => {
    cy.visit(`${baseURL}/`);
    cy.get("body").should("contain", "Startseite");
  });

  it("navigate to non-existing page => show error page", () => {
    cy.intercept({
      method: "GET",
      url: `${baseURL}/*`,
    }).as("visit");
    cy.visit(`${baseURL}/thisdoesnotexist`, { failOnStatusCode: false });
    cy.wait("@visit").then(({ response }) => {
      expect(response.statusCode).to.eq(404);
    });
    // page should contain 404 somewhere
    cy.get("body").should("contain", "404");
  });
});
