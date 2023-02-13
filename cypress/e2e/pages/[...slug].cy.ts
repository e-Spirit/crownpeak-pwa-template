const baseURL = Cypress.env("cyBaseURL");

describe(`slug page`, () => {
  it("navigate to page => render content", () => {
    cy.visit(`${baseURL}/Unsere-Lösungen`);
    cy.get("body").should("contain", "Unsere Lösungen");
  });

  it("navigate back and forth => don't make new network calls for cached content", () => {
    cy.intercept({
      method: "GET",
      url: "/api/elements",
    }).as("fetchContent");
    cy.visit(`${baseURL}`);
    cy.get('[href="/Unsere-Lösungen/"]').click();
    cy.get('[href="/Startseite/"]').click();
    cy.get('[href="/Unsere-Lösungen/"]').click();
    cy.wait(3000);

    // newtwork calls happen once on the server
    cy.get("@fetchContent").should("eq", null);
  });
});
