describe(`locale switching`, () => {
  const baseURL = Cypress.env("cyBaseURL");
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it("change language on /Startseite/ => redirect /Home/", () => {
    // go to / and check if we are redirect to any other page than /
    cy.visit(`${baseURL}/Startseite/`);
    cy.waitForHydration();

    // click on the button with data-test-id="en_GB-switch"
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);
  });

  it("change language, navigate back => change language back", () => {
    // go to / and check if we are redirect to any other page than /
    cy.visit(`${baseURL}/Startseite/`);
    cy.waitForHydration();

    // click on the button with data-test-id="en_GB-switch"
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);

    cy.go("back");

    cy.url().should("eq", `${baseURL}/Startseite/`);
    cy.waitForHydration();

    // button with data-testid de_DE-switch should be visible and have data-activeLocale="true"
    cy.get("button[data-testid='de_DE-switch']")
      .should("be.visible")
      .should("have.attr", "data-activeLocale", "true");
  });

  it("change language => change content", () => {
    cy.visit(`${baseURL}/Startseite/`);
    cy.waitForHydration();

    // click on the button with data-test-id="en_GB-switch"
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);

    // check if the body contains welcome
    cy.get("body").should("contain", "Welcome");
  });

  it("change language => highlight active language", () => {
    cy.visit(`${baseURL}/Startseite/`);
    cy.waitForHydration();

    // de_DE-switch should be visible and have class bg-green-300
    cy.get("button[data-testid='de_DE-switch']")
      .should("be.visible")
      .should("have.class", "bg-green-300");

    // en_GB-switch should be visible and have class bg-gray-50
    cy.get("button[data-testid='en_GB-switch']")
      .should("be.visible")
      .should("have.class", "bg-gray-50");

    // click on the button with data-test-id="en_GB-switch"
    cy.get("button[data-testid='en_GB-switch']").click();

    cy.url().should("eq", `${baseURL}/Home/`);

    // en_GB-switch should be visible and have class bg-green-300
    cy.get("button[data-testid='en_GB-switch']")
      .should("be.visible")
      .should("have.class", "bg-green-300");

    // de_DE-switch should be visible and have class bg-gray-50
    cy.get("button[data-testid='de_DE-switch']")
      .should("be.visible")
      .should("have.class", "bg-gray-50");
  });

  // TODO: Add test for language switch to non-existing page
  // Need to integrate E2E CaaS Setup first
});
