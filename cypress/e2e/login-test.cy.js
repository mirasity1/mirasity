describe('Login Test Page', () => {
  beforeEach(() => {
    cy.visit('/admin-test');
  });

  it('should display the login form', () => {
    cy.contains('Login de Teste');
    cy.contains('Página escondida para testar autenticação');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Fazer Login');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Nome de utilizador é obrigatório');
    cy.contains('Palavra-passe é obrigatória');
  });

  it('should show password length validation', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('123');
    cy.get('button[type="submit"]').click();
    cy.contains('Palavra-passe deve ter pelo menos 6 caracteres');
  });

  it('should show error for wrong password', () => {
    // Intercept the API call
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        success: false,
        error: 'Palavra-passe incorreta',
        message: 'A palavra-passe que inseriu está incorreta. Tente novamente.',
        code: 'WRONG_PASSWORD'
      }
    }).as('loginRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    // Check loading state
    cy.contains('A fazer login...');
    cy.get('button[type="submit"]').should('be.disabled');

    // Wait for request and check error
    cy.wait('@loginRequest');
    cy.contains('Palavra-passe incorreta');
  });

  it('should show different error for correct password', () => {
    // Intercept the API call for correct password
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: {
        success: false,
        error: 'Login desabilitado',
        message: 'Esta é uma página de teste - login está desabilitado para demonstrar error handling',
        code: 'LOGIN_DISABLED_FOR_TESTING'
      }
    }).as('loginRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.contains('Login desabilitado');
  });

  it('should toggle password visibility', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    
    // Click the eye icon to show password
    cy.get('input[name="password"]').parent().find('button').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    
    // Click again to hide password
    cy.get('input[name="password"]').parent().find('button').click();
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should clear field errors when user types', () => {
    // Trigger validation errors
    cy.get('button[type="submit"]').click();
    cy.contains('Nome de utilizador é obrigatório');

    // Type in username field
    cy.get('input[name="username"]').type('test');
    
    // Error should disappear
    cy.contains('Nome de utilizador é obrigatório').should('not.exist');
  });

  it('should have working back to portfolio link', () => {
    cy.contains('Voltar ao Portfólio').should('have.attr', 'href', '/');
  });

  it('should display helpful hints', () => {
    cy.contains('Para Testes:');
    cy.contains('Username: qualquer nome');
    cy.contains('Password correta: 123456');
    cy.contains('Qualquer outra password dará erro');
  });

  it('should handle network errors gracefully', () => {
    // Simulate network error
    cy.intercept('POST', '/api/login', { forceNetworkError: true }).as('loginRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.contains('conectividade', { matchCase: false });
  });

  it('should be responsive on mobile viewport', () => {
    cy.viewport('iphone-x');
    
    // Check that elements are still visible and accessible
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Login de Teste').should('be.visible');
  });
});