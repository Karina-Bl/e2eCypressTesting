Cypress.Commands.add('interceptAppErrors', () => {
  cy.on('uncaught:exception', (error, runnable) => {
    console.error('Uncaught exception in the application:', error);
    return false; 
  });
});

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/signin");
  cy.get("#bannerDeclineButton").click();
  cy.get("#email").type(username);
  cy.get("#btnNext").click();
  cy.get("#password").type(password);
  cy.get("#btnLogin").click();
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq("/myaccount/summary");
  });
});

Cypress.Commands.add("uploadPhoto", () => {
  cy.intercept(
    "POST",
    "https://www.sandbox.paypal.com/myaccount/profile/api/photo/uploadPhoto"
  ).as("photoUpload");
  cy.get("#upload-file").selectFile("cypress/fixtures/goatFace.png", {
    force: true,
  });
  cy.get("#confirm-button").click();
  cy.wait("@photoUpload");
});
