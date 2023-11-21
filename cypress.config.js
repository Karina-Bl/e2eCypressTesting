const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.sandbox.paypal.com/",
    setupNodeEvents(on, config) {},
    env: {
      payPalBuyer: "sb-k4rvc28158654@personal.example.com",
      payPalbuyerPassword: "8*sMSbKhP53Zf&mM",
    },
  },
});
