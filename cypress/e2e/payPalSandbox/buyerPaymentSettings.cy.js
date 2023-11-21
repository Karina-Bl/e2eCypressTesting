const username = Cypress.env("payPalBuyer");
const password = Cypress.env("payPalbuyerPassword");
// to do: uncaught syntax error originates from the app, cy.on('uncaught:exception', ....does not work
describe("manage buyer payments", () => {
  beforeEach('login', () => {
    cy.interceptAppErrors();
    cy.session('login ', () => {
      cy.login(username, password);
    }) 
  })
  it("selects preferred payment", () => {
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get("#paymentsLink").click();
    cy.get('[data-testid="banks"]').click();
    cy.get("#choose-new-choice-fi_balance").check();
    cy.get('[data-testid="button-submit"]').click();
    cy.get(".modal-ppvx2-cta").click();
    cy.get('[data-testid="banks"]').contains("PayPal Balance");
  });
  it("changes preferred payment", () => {
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get("#paymentsLink").click();
    cy.get('[data-testid="banks"]').click();
    cy.get("#choose-new-choice-fi0").check();
    cy.get('[data-testid="button-submit"]').click();
    cy.get(".modal-ppvx2-cta").click();
    cy.get('[data-testid="banks"]').contains("CREDIT UNION 1 (AK)");
  });
});
