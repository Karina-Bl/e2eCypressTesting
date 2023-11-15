let username = Cypress.env("payPalBuyer");
let password = Cypress.env("payPalbuyerPassword");
let buyerEmail = "buyeremail@testemail.com";
describe("edit paypal buyer profile", () => {
  beforeEach(() => {
    cy.session("login", () => {
      cy.login(username, password);
    });
  });
  it("adds a profile picture", () => {
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get('img[alt="user"]').should("not.exist");
    cy.get("#photo-section_profile-avatar-overlay").click();
    cy.uploadPhoto();
    cy.get('img[alt="user"]');
    cy.log("🤖 new profile picture set ");
  });
  it("deletes the profile picture", () => {
    cy.intercept(
      "DELETE",
      "https://www.sandbox.paypal.com/myaccount/profile/api/photo/deletePhoto"
    ).as("deletePhoto");
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get('img[alt="user"]');
    cy.get("#photo-section_profile-avatar-overlay").click();
    cy.get("#remove-photo").click();
    cy.get("#submitRemovePhoto").click();
    cy.wait("@deletePhoto").then(() => {
      cy.location().then((loc) => {
        expect(loc.pathname).to.eq("/myaccount/profile/");
      });
      cy.get('img[alt="user"]').should("not.exist");
      cy.log("🧤 profile picture deleted ");
    });
  });

  it("adds an email address", () => {
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get("#email-section_profile-tile-header-link").click();
    cy.get("#text-input-emailAdd").type(buyerEmail);
    cy.get("#test_addUpdateEmailButton").click();
    cy.get(
      ".ppvx_modal-header__close___2-10-0 > .ppvx_icon-button___1-6-9"
    ).click();
    cy.get("#email-section-item_email1_item-content-line").contains(buyerEmail);
    cy.log("🧤 email adress added");
  });

  it("deletes the email address", () => {
    cy.visit("/myaccount/profile/");
    cy.setCookie("cookie_check", "yes");
    cy.get("#email-section-item_email1_menu-option-icon-button").click();
    cy.get("#email-section-item_email1_menu-option-action-menu")
      .contains("Remove")
      .should("be.visible")
      .click({ force: true });
    cy.get(".generic-container > .ppvx_btn___5-12-9").click();
    cy.log("🧤 email adress deleted");
  });
});
