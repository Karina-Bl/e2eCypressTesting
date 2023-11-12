Cypress.Commands.add("login", (username, password) => {
  cy.visit("/signin");
  cy.setCookie("cookie_check", "yes");
  cy.get("#email").type(username);
  cy.get("#btnNext").click();
  cy.get("#password").type(password);
  cy.get("#btnLogin").click();
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq("/myaccount/summary");
  });
});
