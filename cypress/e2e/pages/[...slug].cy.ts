import { should } from "chai";

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

  it("navigate to content projection => display content", () => {
    cy.visit(`${baseURL}/Productsss/Goomazon-Oklexa-SP93.html`);
    cy.get("[data-testid=productSection]").should("contain", "The Oklexa SP93");
  });

  it("click back button to content projection => display same content", () => {
    cy.visit(`${baseURL}/Productsss/Goomazon-Oklexa-SP93.html`);
    cy.get("[data-testid=productSection]").should("contain", "The Oklexa SP93");
    cy.contains("Home").click();
    cy.url().should("eq", `${baseURL}/Home/`);
    cy.go("back");
    cy.url().should("eq", `${baseURL}/Productsss/Goomazon-Oklexa-SP93.html`);
    cy.get("[data-testid=productSection]").should("contain", "The Oklexa SP93");
  });

  it("refresh content projection page => display same content", () => {
    cy.visit(`${baseURL}/Productsss/Goomazon-Oklexa-SP93.html`);
    cy.get("[data-testid=productSection]").should("contain", "The Oklexa SP93");
    cy.reload();
    cy.url().should("eq", `${baseURL}/Productsss/Goomazon-Oklexa-SP93.html`);
    cy.get("[data-testid=productSection]").should("contain", "The Oklexa SP93");
  });
});

export {};
