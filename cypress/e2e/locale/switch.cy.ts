describe(`locale switching`, () => {
  const baseURL = Cypress.env("cyBaseURL");
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("change language on /Startseite/ => redirect /Home/", () => {
    cy.visit(`${baseURL}/Startseite/`);

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);
  });

  it("change language, navigate back => change language back", () => {
    cy.visit(`${baseURL}/Startseite/`);

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);
    cy.go("back");

    cy.url().should("eq", `${baseURL}/Startseite/`);

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='de_DE-switch']")
      .should("be.visible")
      .should("have.attr", "data-activeLocale", "true");
  });

  it("change language => change content", () => {
    cy.visit(`${baseURL}/Startseite/`);

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);

    cy.get("body").should("contain", "Welcome");
  });

  it("change language => highlight active language", () => {
    cy.visit(`${baseURL}/Startseite/`);
    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='de_DE-switch']")
      .should("be.visible")
      .should("have.class", "underline");

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']").should("be.visible");

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='en_GB-switch']")
      .should("be.visible")
      .should("have.class", "underline");

    cy.get("div[data-testid='languagesDropdown']").invoke("show");
    cy.get("button[data-testid='de_DE-switch']").should("be.visible");
  });

  // TODO: Add test for language switch to non-existing page
  // Need to integrate E2E CaaS Setup first
});
