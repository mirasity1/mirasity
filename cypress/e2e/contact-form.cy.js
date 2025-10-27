// cypress/e2e/contact-form.cy.js

describe('Contact Form E2E Tests', () => {
  beforeEach(() => {
    // Visitar a página antes de cada teste
    cy.visit('http://localhost:3000');
    
    // Aceitar cookies se necessário
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cookie-banner"]').length > 0) {
        cy.get('[data-testid="accept-all-cookies"]').click();
      }
    });

    // Navegar para a secção de contacto
    cy.get('nav').contains('Contacto').click();
    cy.get('#contact').should('be.visible');
  });

  describe('Form Validation', () => {
    it('deve mostrar erros de validação para formulário vazio', () => {
      // Tentar submeter formulário vazio
      cy.get('button[type="submit"]').contains('Enviar Mensagem').click();

      // Verificar se erros aparecem
      cy.contains('Nome é obrigatório').should('be.visible');
      cy.contains('Email é obrigatório').should('be.visible');
      cy.contains('Assunto é obrigatório').should('be.visible');
      cy.contains('Mensagem é obrigatória').should('be.visible');
    });

    it('deve validar formato de email', () => {
      cy.get('input[name="email"]').type('email-invalido');
      cy.get('button[type="submit"]').click();
      
      cy.contains('Email inválido').should('be.visible');
    });

    it('deve limpar erros quando utilizador digita', () => {
      // Gerar erros primeiro
      cy.get('button[type="submit"]').click();
      cy.contains('Nome é obrigatório').should('be.visible');

      // Digitar no campo nome
      cy.get('input[name="name"]').type('João');
      
      // Erro deve desaparecer
      cy.contains('Nome é obrigatório').should('not.exist');
    });
  });

  describe('Form Submission', () => {
    it('deve preencher e submeter formulário com sucesso', () => {
      // Interceptar API call
      cy.intercept('POST', '/api/contact', {
        statusCode: 200,
        body: { success: true, message: 'Email enviado com sucesso!' }
      }).as('submitForm');

      // Preencher formulário
      cy.get('input[name="name"]').type('João Silva');
      cy.get('input[name="email"]').type('joao@example.com');
      cy.get('input[name="subject"]').type('Teste E2E');
      cy.get('textarea[name="message"]').type('Esta é uma mensagem de teste end-to-end.');

      // Resolver questão matemática (se existir)
      cy.get('body').then(($body) => {
        if ($body.find('input[type="number"]').length > 0) {
          // Assumir que a resposta é sempre 5 para este teste
          cy.get('input[type="number"]').type('5');
        }
      });

      // Submeter formulário
      cy.get('button[type="submit"]').click();

      // Verificar loading state
      cy.contains('Enviando...').should('be.visible');

      // Aguardar resposta da API
      cy.wait('@submitForm');

      // Verificar mensagem de sucesso
      cy.contains('Mensagem enviada com sucesso').should('be.visible');

      // Verificar se formulário foi limpo
      cy.get('input[name="name"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
    });

    it('deve mostrar erro quando API falha', () => {
      // Interceptar API call com erro
      cy.intercept('POST', '/api/contact', {
        statusCode: 500,
        body: { success: false, message: 'Erro interno do servidor' }
      }).as('submitFormError');

      // Preencher formulário
      cy.get('input[name="name"]').type('Pedro Costa');
      cy.get('input[name="email"]').type('pedro@example.com');
      cy.get('input[name="subject"]').type('Teste de Erro');
      cy.get('textarea[name="message"]').type('Teste de erro E2E.');

      // Submeter formulário
      cy.get('button[type="submit"]').click();

      // Aguardar resposta da API
      cy.wait('@submitFormError');

      // Verificar mensagem de erro
      cy.contains('Erro ao enviar mensagem').should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('deve ser navegável por teclado', () => {
      // Testar navegação por tab
      cy.get('input[name="name"]').focus().tab();
      cy.get('input[name="email"]').should('be.focused').tab();
      cy.get('input[name="subject"]').should('be.focused').tab();
      cy.get('textarea[name="message"]').should('be.focused');
    });

    it('deve ter labels corretos para screen readers', () => {
      cy.get('input[name="name"]').should('have.attr', 'aria-label').or('have.attr', 'id');
      cy.get('input[name="email"]').should('have.attr', 'aria-label').or('have.attr', 'id');
      cy.get('input[name="subject"]').should('have.attr', 'aria-label').or('have.attr', 'id');
      cy.get('textarea[name="message"]').should('have.attr', 'aria-label').or('have.attr', 'id');
    });
  });

  describe('Responsive Design', () => {
    it('deve funcionar em dispositivos móveis', () => {
      cy.viewport('iphone-6');
      
      // Verificar se formulário ainda é visível e usável
      cy.get('input[name="name"]').should('be.visible').type('Mobile Test');
      cy.get('input[name="email"]').should('be.visible').type('mobile@test.com');
      cy.get('input[name="subject"]').should('be.visible').type('Mobile Subject');
      cy.get('textarea[name="message"]').should('be.visible').type('Mobile message test.');
      
      // Botão deve estar visível e clicável
      cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled');
    });

    it('deve funcionar em tablet', () => {
      cy.viewport('ipad-2');
      
      cy.get('#contact').should('be.visible');
      cy.get('input[name="name"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  });

  describe('Performance', () => {
    it('deve carregar rapidamente', () => {
      cy.visit('http://localhost:3000', {
        onBeforeLoad: (win) => {
          win.performance.mark('start');
        },
        onLoad: (win) => {
          win.performance.mark('end');
          win.performance.measure('pageLoad', 'start', 'end');
          const measure = win.performance.getEntriesByName('pageLoad')[0];
          expect(measure.duration).to.be.lessThan(3000); // menos de 3 segundos
        }
      });
    });
  });

  describe('Integration with Other Components', () => {
    it('deve navegar para contacto a partir do Hero', () => {
      cy.visit('http://localhost:3000');
      
      // Clicar no botão "Entrar em Contacto" no Hero
      cy.contains('Entrar em Contacto').click();
      
      // Deve scrollar para a secção de contacto
      cy.get('#contact').should('be.visible');
      cy.url().should('include', '#contact');
    });

    it('deve manter estado do idioma durante uso do formulário', () => {
      // Mudar para inglês (se disponível)
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="language-toggle"]').length > 0) {
          cy.get('[data-testid="language-toggle"]').click();
          
          // Verificar se textos mudaram para inglês
          cy.contains('Contact').should('be.visible');
          
          // Formulário deve continuar funcional
          cy.get('input[name="name"]').type('English Test');
          cy.get('input[name="email"]').type('english@test.com');
        }
      });
    });
  });
});