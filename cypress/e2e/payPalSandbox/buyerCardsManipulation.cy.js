const username = Cypress.env("payPalBuyer");
const password = Cypress.env("payPalbuyerPassword");
const cards = {
  Mastercard: {
    cardType: "master_card",
    cardNo: '5428546769511978',
    last4Digits: '1978',
    expiryDate: "10/2026",
    CVC: "888",
  },
  Visa: {
    cardType: "visa",
    cardNo: '4214024387634508',
    last4Digits: '4508',
    expiryDate: "01/2027",
    CVC: "887",
  },
};
describe("paypal buyer sandbox cards manipulation", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.login(username, password);
    });
  });
  Object.keys(cards).forEach((card) => {
    it(`links a new ${card} into the paypal account`, () => {
      cy.visit("/myaccount/summary");
      cy.get("#bankCardLinkBankOrCard").click();
      cy.get('[data-testid="addFi"]').first().click();
      cy.get(".test_achtodc_default > .col").click();
      cy.get("#cardNumber").type(cards[card].cardNo);
      cy.get("#brand").select(cards[card].cardType);
      cy.get("#expDate").type(cards[card].expiryDate);
      cy.get("#verificationCode").type(cards[card].CVC);
      cy.get('[data-testid="button-submit"]').click();
      cy.get('[data-testid="header"]').contains(
        `You linked your ${card} Credit`
      );
      cy.get(".modal-ppvx2-cta").click();
      cy.get(
        ".isSelected_ltr > .fiListItem-link > .fiListItem-row > :nth-child(2) > span.ppvx_text--caption"
      ).contains(cards[card].last4Digits);
    });
    it(`removes the ${card} from the account`, () => {
      cy.visit("/myaccount/money/");
      cy.get(
        ".fiListItem-link > .fiListItem-row > :nth-child(2) > .fiListItem-identifier > span"
      )
        .contains(`${card}`)
        .click();
      cy.get(".test_removeCard").click();
      cy.get('[data-testid="button-submit"]').click();
      cy.get('[data-testid="header"]').contains("has been removed");
      cy.get(".modal-ppvx2-cta").click();
    });
  });

  it("fails to add the card with invalid number", () => {
    cy.visit("/myaccount/money/cards/new");
    cy.get(".test_achtodc_default > .col").click();
    cy.get("#cardNumber").type('1234567');
    cy.get("#brand").select("Mastercard");
    cy.get("#expDate").type("01/2011");
    cy.get("#verificationCode").type('222');
    cy.get('[data-testid="button-submit"]').click();
    cy.get('[role="alert"]');
  });
});
