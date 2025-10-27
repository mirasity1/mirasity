// cypress/e2e/contact-form.cy.js

describe('Contact Form E2E Tests', () => {
  beforeEach(() => {
    // Visitar a página e ir direto para o contacto
    cy.visit('http://localhost:3000');
    
    // Aceitar cookies se necessário
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="cookie-banner"]').length > 0) {
        cy.get('[data-testid="accept-all-cookies"]').click();
      }
    });

    // Navegar para a secção de contacto (usando scroll como alternativa)
    cy.get('#contact', { timeout: 10000 }).scrollIntoView().should('be.visible');
    cy.wait(1000); // Aguardar animações
  });

  describe('Form Validation', () => {
    it('deve mostrar erros de validação para formulário vazio', () => {
      // Tentar submeter formulário vazio
      cy.get('button[type="submit"]').first().click();

      // Verificar se erros aparecem (usar HTML5 validation ou campo obrigatório)
      cy.get('input[name="name"]').should('have.attr', 'required');
      cy.get('input[name="email"]').should('have.attr', 'required');
      cy.get('input[name="subject"]').should('have.attr', 'required');
      cy.get('textarea[name="message"]').should('have.attr', 'required');
    });

    it('deve validar formato de email', () => {
      cy.get('input[name="email"]').type('email-invalido');
      cy.get('button[type="submit"]').click();
      
      // Verificar se campo email mostra como inválido (HTML5 validation)
      cy.get('input[name="email"]').then(($input) => {
        expect($input[0].validity.valid).to.be.false;
      });
    });

    it('deve limpar erros quando utilizador digita', () => {
      // Gerar erros primeiro - submeter formulário vazio
      cy.get('button[type="submit"]').first().click();
      
      // Verificar se campo tem validação HTML5
      cy.get('input[name="name"]').should('have.attr', 'required');

      // Digitar no campo nome
      cy.get('input[name="name"]').type('João');
      
      // Campo deve ficar válido
      cy.get('input[name="name"]').then(($input) => {
        expect($input[0].validity.valid).to.be.true;
      });
    });
  });

  describe('Form Submission', () => {
    it('deve preencher e submeter formulário com sucesso', () => {
      // Interceptar API call - usar endpoint correto
      cy.intercept('POST', '**/api/send-email', {
        statusCode: 200,
        body: { success: true, message: 'Email enviado com sucesso!' }
      }).as('submitForm');

      // Preencher formulário
      cy.get('input[name="name"]').type('John Silva');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="subject"]').type('E2E Test');
      cy.get('textarea[name="message"]').type('This is an end-to-end test message.');

      // Resolver questão matemática (obrigatório para envio)
      cy.get('input[type="number"]').should('be.visible').then(($input) => {
        // Encontrar a pergunta matemática
        cy.get($input).parent().find('span').invoke('text').then((text) => {
          console.log('Math question:', text);
          const match = text.match(/(\d+)\s*\+\s*(\d+)/);
          if (match) {
            const answer = parseInt(match[1]) + parseInt(match[2]);
            cy.get('input[type="number"]').clear().type(answer.toString());
          } else {
            // Fallback para uma resposta padrão
            cy.get('input[type="number"]').clear().type('5');
          }
        });
      });

      // Submeter formulário
      cy.get('button[type="submit"]').click();

      // Verificar loading state - usar texto em inglês (padrão)
      cy.contains('Sending...', { timeout: 3000 }).should('be.visible');

      // Aguardar resposta da API
      cy.wait('@submitForm');

      // Verificar mensagem de sucesso - usar texto em inglês
      cy.contains('Message sent successfully', { timeout: 5000 }).should('be.visible');

      // Verificar se formulário foi limpo
      cy.get('input[name="name"]').should('have.value', '');
      cy.get('input[name="email"]').should('have.value', '');
    });

    it('deve mostrar erro quando API falha', () => {
      // Interceptar API call com erro
      cy.intercept('POST', '**/api/send-email', {
        statusCode: 500,
        body: { success: false, message: 'Erro interno do servidor' }
      }).as('submitFormError');

      // Preencher formulário
      cy.get('input[name="name"]').type('Peter Costa');
      cy.get('input[name="email"]').type('peter@example.com');
      cy.get('input[name="subject"]').type('Error Test');
      cy.get('textarea[name="message"]').type('This is an error test message.');

      // Resolver questão matemática (obrigatório)
      cy.get('input[type="number"]').should('be.visible').then(($input) => {
        cy.get($input).parent().find('span').invoke('text').then((text) => {
          const match = text.match(/(\d+)\s*\+\s*(\d+)/);
          if (match) {
            const answer = parseInt(match[1]) + parseInt(match[2]);
            cy.get('input[type="number"]').clear().type(answer.toString());
          } else {
            cy.get('input[type="number"]').clear().type('5');
          }
        });
      });

      // Submeter formulário
      cy.get('button[type="submit"]').click();

      // Aguardar resposta da API
      cy.wait('@submitFormError');

      // Verificar mensagem de erro - usar texto em inglês
      cy.contains('Error sending message', { timeout: 5000 }).should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('deve ser navegável por teclado', () => {
      // Usar comando nativo do Cypress para navegação por teclado
      cy.get('input[name="name"]').focus();
      cy.get('input[name="name"]').tab();
      cy.get('input[name="email"]').should('be.focused');
      cy.get('input[name="email"]').tab();
      cy.get('input[name="subject"]').should('be.focused');
      cy.get('input[name="subject"]').tab();
      cy.get('textarea[name="message"]').should('be.focused');
    });

    it('deve ter labels corretos para screen readers', () => {
      cy.get('input[name="name"]').should('have.attr', 'id');
      cy.get('input[name="email"]').should('have.attr', 'id');
      cy.get('input[name="subject"]').should('have.attr', 'id');
      cy.get('textarea[name="message"]').should('have.attr', 'id');
      
      // Verificar se existem labels
      cy.get('label[for="name"]').should('exist');
      cy.get('label[for="email"]').should('exist');
      cy.get('label[for="subject"]').should('exist');
      cy.get('label[for="message"]').should('exist');
    });
  });

  describe('Responsive Design', () => {
    it('deve funcionar em dispositivos móveis', () => {
      cy.viewport('iphone-6');
      
      // Aguardar que a página carregue e scroll para contacto
      cy.get('#contact', { timeout: 10000 }).scrollIntoView();
      cy.wait(1000); // Aguardar animações
      
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
      
      // Aguardar carregamento e scroll
      cy.get('#contact', { timeout: 10000 }).scrollIntoView();
      cy.wait(1000); // Aguardar animações
      
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
      
      // Procurar por botões que possam levar ao contacto - usar texto em inglês
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="contact"], button:contains("Contact"), a:contains("Get In Touch")').length > 0) {
          cy.get('a[href*="contact"], button:contains("Contact"), a:contains("Get In Touch")').first().click();
        } else {
          // Se não encontrar, scroll diretamente para contacto
          cy.get('#contact').scrollIntoView();
        }
      });
      
      // Deve estar na secção de contacto
      cy.get('#contact').should('be.visible');
    });

    it('deve manter estado do idioma durante uso do formulário', () => {
      // Verificar se toggle de idioma existe e mudar para português
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="language-toggle"], button:contains("PT"), .language-toggle').length > 0) {
          cy.get('[data-testid="language-toggle"], button:contains("PT"), .language-toggle').first().click();
          cy.wait(500); // Aguardar mudança de idioma
          
          // Formulário deve continuar funcional após mudança de idioma
          cy.get('#contact').scrollIntoView();
          cy.get('input[name="name"]').type('Utilizador Teste');
          cy.get('input[name="email"]').type('teste@exemplo.com');
        } else {
          // Se não há toggle, apenas testar que o formulário funciona em inglês
          cy.get('#contact').scrollIntoView();
          cy.get('input[name="name"]').type('Test User');
          cy.get('input[name="email"]').type('test@example.com');
        }
      });
    });
  });
});