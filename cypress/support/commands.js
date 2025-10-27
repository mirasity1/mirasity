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
  cy.focused().tab();
});

// Custom command for improved waiting with timeout
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Custom command to set language for tests  
Cypress.Commands.add('setLanguage', (language = 'en') => {
  cy.window().then((win) => {
    // Mock navigator.language to control language detection
    Object.defineProperty(win.navigator, 'language', {
      writable: true,
      configurable: true,
      value: language === 'pt' ? 'pt-PT' : 'en-US'
    });
    
    Object.defineProperty(win.navigator, 'languages', {
      writable: true,
      configurable: true,
      value: language === 'pt' ? ['pt-PT', 'pt'] : ['en-US', 'en']
    });
    
    // Force page reload to apply language change
    win.location.reload();
  });
});

// Custom command to visit with language preset
Cypress.Commands.add('visitWithLanguage', (url, language = 'en') => {
  cy.visit(url, {
    onBeforeLoad: (win) => {
      // Set language before page loads
      Object.defineProperty(win.navigator, 'language', {
        writable: true,
        configurable: true,
        value: language === 'pt' ? 'pt-PT' : 'en-US'
      });
      
      Object.defineProperty(win.navigator, 'languages', {
        writable: true,
        configurable: true,
        value: language === 'pt' ? ['pt-PT', 'pt'] : ['en-US', 'en']
      });
    }
  });
});

// Custom command to solve math verification
Cypress.Commands.add('solveMathVerification', () => {
  cy.get('[data-cy="math-question"]').invoke('text').then((questionText) => {
    const match = questionText.match(/(\d+)\s*\+\s*(\d+)/);
    if (match) {
      const num1 = parseInt(match[1]);
      const num2 = parseInt(match[2]);
      const answer = num1 + num2;
      cy.get('input[type="number"]').clear().type(answer.toString());
    } else {
      // Fallback
      cy.get('input[type="number"]').clear().type('5');
    }
  });
});

// Demo-specific commands for slower, visual testing
Cypress.Commands.add('demoVisit', (url, description) => {
  if (Cypress.env('DEMO_MODE')) {
    cy.log(`🎭 DEMO: ${description}`);
    cy.wait(500); // Pause para demonstração
  }
  
  // Visit with Portuguese language preset
  cy.visitWithLanguage(url, 'pt');
  
  if (Cypress.env('DEMO_MODE')) {
    cy.wait(1000); // Aguardar carregamento visual
  }
});

Cypress.Commands.add('demoStep', (message) => {
  if (Cypress.env('DEMO_MODE')) {
    cy.log(`📋 ${message}`);
    cy.wait(800); // Pausa entre passos
  }
});

Cypress.Commands.add('demoPause', (message) => {
  if (Cypress.env('DEMO_MODE')) {
    cy.log(`⏸️ ${message}`);
    cy.wait(2000); // Pausa longa para demonstração
  }
});

Cypress.Commands.add('demoType', (selector, text, options = {}) => {
  cy.get(selector).should('be.visible');
  
  if (Cypress.env('DEMO_MODE')) {
    cy.get(selector).type(text, { delay: 100, ...options });
    cy.wait(500);
  } else {
    cy.get(selector).type(text, options);
  }
});

Cypress.Commands.add('demoClick', (selector, description = '') => {
  if (Cypress.env('DEMO_MODE') && description) {
    cy.log(`🖱️ ${description}`);
  }
  
  cy.get(selector).should('be.visible').click();
  
  if (Cypress.env('DEMO_MODE')) {
    cy.wait(1000); // Pausa após clique
  }
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