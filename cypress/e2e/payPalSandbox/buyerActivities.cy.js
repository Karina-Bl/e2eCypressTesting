const username = Cypress.env("payPalBuyer");
const password = Cypress.env("payPalbuyerPassword");
describe("", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.login(username, password);
    });
  });
  it("verifies printing of the last transaction", () => {
    cy.visit("/myaccount/activities/");
    cy.setCookie("cookie_check", "yes");
    cy.window().then((win) => {
      cy.stub(win, "open").as("windowOpen");
    });
    cy.get('[data-testid="rowHeader"]').click(); // expands the element
    cy.get(".qKkFY").should("be.visible"); // expaned element
    cy.get('[data-cy="transactionPrintText"]').click();
    cy.get("@windowOpen").should(
      "be.calledWith",
      "/myaccount/activities/print-details/6DN651633H2647030",
      "_blank"
    );
  });
  // to do: the download seems to not be working correctly
  it.skip("verifies downloading a statement", () => {
    cy.intercept('POST', 'https://www.sandbox.paypal.com/myaccount/activities/statements/monthly/download').as('download');
    cy.visit("/myaccount/activities/statements/monthly");
    cy.setCookie("cookie_check", "yes");
    cy.get('[data-pagename="accountStatement:2023"]').click();
    const whichMonts = ["February", "March", "April", "May"];
    whichMonts.forEach((month) => {
      cy.get(`[name="${month}Month"]`).check({ force: true });
    });
    cy.get(".ppvx_col___2-7-9 > .ppvx_btn___5-11-6").click();
    
  });
});