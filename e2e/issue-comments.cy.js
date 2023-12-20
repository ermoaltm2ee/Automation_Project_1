describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it("Should create a comment successfully", () => {
    const comment = "TEST_COMMENT";

    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();

      cy.get('textarea[placeholder="Add a comment..."]').type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });
  });

  it("Should edit a comment successfully", () => {
    const previousComment = "An old silent pond...";
    const comment = "TEST_COMMENT_EDITED";

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");

      cy.get('textarea[placeholder="Add a comment..."]')
        .should("contain", previousComment)
        .clear()
        .type(comment);

      cy.contains("button", "Save").click().should("not.exist");

      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", comment);
    });
  });

  it("Should delete a comment successfully", () => {
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .contains("Delete")
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");

    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.exist");
  });
});

//Tests for Comments Functionality
//Assignment Steps:
const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');
import { faker } from "@faker-js/faker";
it("Test Combination: Comments Functionality", () => {
  const randomText = faker.lorem.sentence();
  const comment = randomText;
  cy.visit("/");

  cy.contains('[data-testid="list-issue"]', "This is an issue of type: Task")
    .should("be.visible")
    .click();
  //Add comment.
  cy.window().scrollTo("bottom");
  cy.contains("Add a comment...").click();
  cy.get('textarea[placeholder="Add a comment..."]').type(comment);
  cy.contains("button", "Save").click().should("not.exist");

  //Assert that the comment has been added and is visible
  cy.contains("Add a comment...").should("exist");
  cy.get('[data-testid="issue-comment"]').should("contain", comment);

  //Edit the added comment.
  const previousComment = randomText;
  cy.get('[data-testid="issue-comment"]')
    .first()
    .contains("Edit")
    .click()
    .should("not.exist");
  cy.get('textarea[placeholder="Add a comment..."]')
    .should("contain", previousComment)
    .clear()
    .type("uus kommentaar");
  cy.contains("button", "Save").click().should("not.exist");

  //Assert that the updated comment is visible
  cy.contains("Add a comment...").should("exist");
  cy.get('[data-testid="issue-comment"]').should("contain", comment);

  //Remove the comment
  getIssueDetailsModal()
    .find('[data-testid="issue-comment"]')
    .contains("Delete")
    .click();
  cy.get('[data-testid="modal:confirm"]')
    .contains("button", "Delete comment")
    .click()
    .should("not.exist");

  //Assert that the comment is removed
  getIssueDetailsModal()
    .find('[data-testid="uus kommentaar"]')
    .should("not.exist");
});
