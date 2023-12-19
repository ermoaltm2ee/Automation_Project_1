// We don't want to waste time when running e2e on cypress waiting for debounced
// inputs. We can use tick() to speed up time and trigger onChange immediately.
Cypress.Commands.add(
  "debounced",
  { prevSubject: true },
  (input, action, value) => {
    cy.clock();
    cy.wrap(input)[action](value);
    cy.tick(1000);
  }
);
