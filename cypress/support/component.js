// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your component test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress for component testing.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// For component testing with React
// Uncomment the following lines if you need component testing:

// import { mount } from 'cypress/react18'
// Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(<MyComponent />)

// Component testing setup
Cypress.Commands.add('mountComponent', (component, options = {}) => {
  // Custom mount command for components if needed
  cy.log('Mounting component for testing')
})