// cypress/support/demo-config.js
// Configurações para modo de apresentação dos testes

export const DEMO_CONFIG = {
  // Flag para ativar modo de apresentação (mais lento e visual)
  isDemoMode: Cypress.env('DEMO_MODE') === 'true' || false,
  
  // Delays para apresentação (em milissegundos)
  delays: {
    shortPause: 800,     // Para ações rápidas como click
    mediumPause: 1500,   // Para ações que precisam de observação
    longPause: 2500,     // Para resultados importantes
    typing: 100,         // Delay entre cada character ao digitar
  },
  
  // Configurações visuais
  visual: {
    highlightElements: true,  // Destacar elementos durante o teste
    showSteps: true,         // Mostrar descrição de cada passo
    slowTyping: true,        // Digitar mais devagar
  }
};

// Comandos personalizados para apresentação
Cypress.Commands.add('demoStep', (description) => {
  if (DEMO_CONFIG.isDemoMode && DEMO_CONFIG.visual.showSteps) {
    cy.log(`🎯 PASSO: ${description}`);
    cy.wait(DEMO_CONFIG.delays.shortPause);
  }
});

Cypress.Commands.add('demoType', (selector, text, options = {}) => {
  cy.demoStep(`Digitando "${text}" no campo ${selector}`);
  
  if (DEMO_CONFIG.isDemoMode && DEMO_CONFIG.visual.slowTyping) {
    // Digitar character por character para efeito visual
    cy.get(selector).click();
    cy.wait(300);
    
    for (let i = 0; i < text.length; i++) {
      cy.get(selector).type(text[i], { delay: DEMO_CONFIG.delays.typing });
    }
    cy.wait(DEMO_CONFIG.delays.shortPause);
  } else {
    cy.get(selector).type(text, options);
  }
});

Cypress.Commands.add('demoClick', (selector, description = null) => {
  const desc = description || `Clicando em ${selector}`;
  cy.demoStep(desc);
  
  if (DEMO_CONFIG.isDemoMode && DEMO_CONFIG.visual.highlightElements) {
    // Destacar elemento antes de clicar
    cy.get(selector).scrollIntoView();
    cy.get(selector).then($el => {
      $el.css('outline', '3px solid #ff6b6b');
      $el.css('outline-offset', '2px');
    });
    cy.wait(DEMO_CONFIG.delays.mediumPause);
  }
  
  cy.get(selector).click();
  
  if (DEMO_CONFIG.isDemoMode) {
    cy.wait(DEMO_CONFIG.delays.shortPause);
  }
});

Cypress.Commands.add('demoAssert', (selector, assertion, description = null) => {
  const desc = description || `Verificando ${assertion} em ${selector}`;
  cy.demoStep(desc);
  
  cy.get(selector).should(assertion);
  
  if (DEMO_CONFIG.isDemoMode) {
    // Destacar elemento verificado
    cy.get(selector).then($el => {
      $el.css('outline', '3px solid #51cf66');
      $el.css('outline-offset', '2px');
    });
    cy.wait(DEMO_CONFIG.delays.mediumPause);
    
    // Remover destaque
    cy.get(selector).then($el => {
      $el.css('outline', 'none');
    });
  }
});

Cypress.Commands.add('demoPause', (reason = 'Pausa para observação') => {
  if (DEMO_CONFIG.isDemoMode) {
    cy.log(`⏸️ ${reason}`);
    cy.wait(DEMO_CONFIG.delays.longPause);
  }
});

Cypress.Commands.add('demoVisit', (url, description = null) => {
  const desc = description || `Navegando para ${url}`;
  cy.demoStep(desc);
  
  cy.visit(url);
  
  if (DEMO_CONFIG.isDemoMode) {
    cy.wait(DEMO_CONFIG.delays.mediumPause);
  }
});