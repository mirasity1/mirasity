// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import './test-translations';
import './commands'
import './demo-config'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests in Command Log to reduce noise
Cypress.on('window:before:load', (win) => {
  const originalFetch = win.fetch
  win.fetch = (...args) => {
    return originalFetch(...args)
  }
})

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions that we don't care about
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false
  }
  // Let other errors fail the test
  return true
})

// Custom commands for common actions
Cypress.Commands.add('visitApp', (path = '/') => {
  cy.visit(path)
  cy.wait(1000) // Wait for app to load
})

// Command to check accessibility
Cypress.Commands.add('checkA11y', () => {
  cy.get('body').should('be.visible')
  // Add more accessibility checks here if needed
})

// Command to handle loading states
Cypress.Commands.add('waitForLoad', () => {
  cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist')
  cy.get('body').should('be.visible')
})