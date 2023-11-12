const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.sandbox.paypal.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      payPalBuyer: "sb-k4rvc28158654@personal.example.com",
      payPalbuyerPassword: "8*sMSbKhP53Zf&mM",
    },
  },
  env: {},
});
