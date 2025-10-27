// ***********************************************************
// This example support/commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************************

// Custom command to fill contact form
Cypress.Commands.add('fillContactForm', (formData = {}) => {
  const data = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message',
    ...formData
  }

  cy.get('[name="name"]', { timeout: 10000 }).should('be.visible').clear().type(data.name)
  cy.get('[name="email"]').should('be.visible').clear().type(data.email)
  cy.get('[name="subject"]').should('be.visible').clear().type(data.subject)
  cy.get('[name="message"]').should('be.visible').clear().type(data.message)
})

// Custom command to submit contact form
Cypress.Commands.add('submitContactForm', () => {
  cy.get('[type="submit"]', { timeout: 10000 })
    .should('be.visible')
    .should('not.be.disabled')
    .click()
})

// Custom command to check navigation
Cypress.Commands.add('checkNavigation', () => {
  cy.get('nav', { timeout: 10000 }).should('be.visible')
  cy.get('nav').within(() => {
    // Check if navigation items are present
    cy.get('a, button').should('have.length.at.least', 1)
  })
})

// Custom command for login test
Cypress.Commands.add('performLogin', (credentials = {}) => {
  const creds = {
    username: 'testuser',
    password: 'testpass',
    ...credentials
  }

  cy.get('[data-testid="username"], [name="username"], input[type="text"]', { timeout: 10000 })
    .first()
    .should('be.visible')
    .clear()
    .type(creds.username)
  
  cy.get('[data-testid="password"], [name="password"], input[type="password"]')
    .first()
    .should('be.visible')
    .clear()
    .type(creds.password)
  
  cy.get('[data-testid="login-submit"], button[type="submit"], .login-button')
    .first()
    .should('be.visible')
    .should('not.be.disabled')
    .click()
})

// Custom command to wait for element
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible')
})

// Custom command to scroll to element
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView().should('be.visible')
})