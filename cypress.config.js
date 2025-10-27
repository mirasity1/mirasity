const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js",
    video: true,
    screenshot: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    env: {
      apiUrl: "http://localhost:3001",
      DEMO_MODE: false  // Ativado via CYPRESS_DEMO_MODE=true
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    // CI-specific configuration
    ...(process.env.CI && {
      video: false,
      screenshotOnRunFailure: false,
      retries: {
        runMode: 2,
        openMode: 0
      },
      browser: 'chrome',
      headless: true
    }),
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.js"
  }
});