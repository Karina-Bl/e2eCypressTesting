const cardNo = 5428546769511978;
const cardType = "master_card";
const expiryDate = "10/2026";
const CVC = "888";
const wrongCardNo = 345679;

describe("paypal buyer sandbox cards manipulation", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.login(Cypress.env("payPalBuyer"), Cypress.env("payPalbuyerPassword"));
    });
  });
  it("links a new card into the paypal account", () => {
    cy.visit("/myaccount/summary");
    cy.get("#bankCardLinkBankOrCard").click();
    cy.get('[data-testid="addFi"]').first().click();
    cy.get(".test_achtodc_default > .col").click();
    cy.get("#cardNumber").type(cardNo);
    cy.get("#brand").select(cardType);
    cy.get("#expDate").type(expiryDate);
    cy.get("#verificationCode").type(CVC);
    cy.get('[data-testid="button-submit"]').click();
    cy.get('[data-testid="header"]').contains(
      "You linked your Mastercard Credit"
    );
    cy.get(".modal-ppvx2-cta").click();
    cy.get(
      ".isSelected_ltr > .fiListItem-link > .fiListItem-row > :nth-child(2) > span.ppvx_text--caption"
    ).contains("1978");
  });
  it("removes the card from the account", () => {
    cy.visit("/myaccount/money");
    cy.get(
      ":nth-child(4) > .fiListItem-link > .fiListItem-row > :nth-child(2)"
    ).click();
    cy.get(".test_removeCard").click();
    cy.get('[data-testid="button-submit"]').click();
    cy.get('[data-testid="header"]').contains("has been removed");
    cy.get(".modal-ppvx2-cta").click();
  });
  it("fails to add the card with invalid number", () => {
    cy.visit("/myaccount/money/cards/new");
    cy.get(".test_achtodc_default > .col").click();
    cy.get("#cardNumber").type(wrongCardNo);
    cy.get("#brand").select(cardType);
    cy.get("#expDate").type(expiryDate);
    cy.get("#verificationCode").type(CVC);
    cy.get('[data-testid="button-submit"]').click();
    cy.get('[role="alert"]').contains(
      "Invalid card number. Check the number and "
    );
  });
});
