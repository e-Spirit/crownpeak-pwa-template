/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      waitForHydration(timeout?: number): Chainable<void>;
    }
  }
}

// wait for the page to hydrate (this is not a good practice, but it works for now)
// alternative solution: https://stackoverflow.com/questions/71020923/why-does-a-button-not-fire-when-clicked-through-cypress-in-a-nuxt-web-app
Cypress.Commands.add("waitForHydration", (timeout: number = 1000) => {
  cy.log("Waiting for hydration ...");
  cy.wait(timeout);
});

export {};
