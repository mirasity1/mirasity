// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for tab navigation
Cypress.Commands.add('tab', () => {
  cy.focused().trigger('keydown', { keyCode: 9 });
});

// Custom command for improved waiting with timeout
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Custom command for filling forms with math verification
Cypress.Commands.add('fillContactForm', (data) => {
  if (data.name) cy.get('input[name="name"]').type(data.name);
  if (data.email) cy.get('input[name="email"]').type(data.email);
  if (data.subject) cy.get('input[name="subject"]').type(data.subject);
  if (data.message) cy.get('textarea[name="message"]').type(data.message);
  
  // Handle math verification (anti-bot check) - always present
  cy.get('input[type="number"]').should('be.visible').then(($input) => {
    cy.get($input).parent().find('span').invoke('text').then((text) => {
      console.log('Math question found:', text);
      const match = text.match(/(\d+)\s*\+\s*(\d+)/);
      if (match) {
        const answer = parseInt(match[1]) + parseInt(match[2]);
        console.log(`Solving: ${match[1]} + ${match[2]} = ${answer}`);
        cy.get('input[type="number"]').clear().type(answer.toString());
      } else {
        console.log('Could not parse math question, using fallback');
        cy.get('input[type="number"]').clear().type('5');
      }
    });
  });
});

// Custom command for solving math verification specifically
Cypress.Commands.add('solveMathVerification', () => {
  cy.get('input[type="number"]').should('be.visible').then(($input) => {
    cy.get($input).parent().find('span').invoke('text').then((text) => {
      const match = text.match(/(\d+)\s*\+\s*(\d+)/);
      if (match) {
        const answer = parseInt(match[1]) + parseInt(match[2]);
        cy.get('input[type="number"]').clear().type(answer.toString());
      } else {
        // Try to get it from a different structure
        cy.get('body').then(($body) => {
          const questionText = $body.find('span:contains("+")').text();
          const numMatch = questionText.match(/(\d+)\s*\+\s*(\d+)/);
          if (numMatch) {
            const answer = parseInt(numMatch[1]) + parseInt(numMatch[2]);
            cy.get('input[type="number"]').clear().type(answer.toString());
          } else {
            cy.get('input[type="number"]').clear().type('5'); // fallback
          }
        });
      }
    });
  });
});

// Custom command for handling loading states
Cypress.Commands.add('expectLoadingThenContent', (loadingText, successText) => {
  cy.contains(loadingText, { timeout: 3000 }).should('be.visible');
  cy.contains(successText, { timeout: 10000 }).should('be.visible');
});

// Example of custom command
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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