describe('Login Test Page', () => {
  beforeEach(() => {
    // Interceptar todas as requisições para debug
    cy.intercept('POST', '**/api/login').as('loginAPI');
    cy.visit('/admin-test');
  });

  it('should display the login form', () => {
    cy.contains('Login de Teste'); // Este título está fixo em português
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
    // Mock da API para simular erro de password incorreta
    cy.intercept('POST', '**/api/login', {
      statusCode: 401,
      body: { error: 'Palavra-passe incorreta' }
    }).as('loginWrongPassword');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    // Aguardar chamada da API
    cy.wait('@loginWrongPassword');

    // Aguardar mensagem de erro específica (Palavra-passe incorreta)
    cy.contains('Palavra-passe incorreta', { timeout: 10000 }).should('be.visible');
    
    // Verificar que botão voltou a ficar enabled após requisição
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should show different error for correct password', () => {
    // Mock da API para simular login desabilitado
    cy.intercept('POST', '**/api/login', {
      statusCode: 401,
      body: { error: 'Login desabilitado para testes' }
    }).as('loginDisabled');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('123456'); // Password correta
    cy.get('button[type="submit"]').click();

    // Aguardar chamada da API
    cy.wait('@loginDisabled');

    // Aguardar mensagem de erro específica (Login desabilitado)
    cy.contains('Login desabilitado', { timeout: 10000 }).should('be.visible');
    
    // Verificar que botão voltou a ficar enabled após requisição
    cy.get('button[type="submit"]').should('not.be.disabled');
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
    // Simular erro de rede interceptando a chamada
    cy.intercept('POST', '**/api/login', { forceNetworkError: true }).as('loginRequest');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    
    // Procurar por mensagem específica de erro de conectividade
    cy.contains('Erro de conectividade com o servidor', { timeout: 8000 }).should('be.visible');
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