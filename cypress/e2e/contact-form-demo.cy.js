// cypress/e2e/contact-form-demo.cy.js
// Versão de apresentação do teste de formulário de contacto

describe('🎭 DEMONSTRAÇÃO: Formulário de Contacto', () => {
  beforeEach(() => {
    cy.log('🚀 Iniciando demonstração do formulário de contacto...');
    
    // Mock do backend para não enviar emails reais durante a demo
    cy.intercept('POST', '**/api/send-email', {
      statusCode: 200,
      body: { 
        success: true, 
        message: 'Email enviado com sucesso!',
        messageId: 'demo-msg-123'
      }
    }).as('sendEmail');
    
    cy.demoVisit('/', 'Abrindo página principal do portfólio');
    cy.demoStep('Navegando até a seção de contacto');
    cy.get('#contact').scrollIntoView();
    cy.wait(1000);
  });

  it('🎯 Deve exibir todos os elementos do formulário', () => {
    cy.log('📋 TESTE: Verificação completa da interface do formulário');
    
    cy.demoStep('Verificando título da seção');
    cy.get('#contact h2').should('contain', 'Contact');
    
    cy.demoStep('Verificando campo de nome');
    cy.get('input[name="name"]').should('be.visible');
    
    cy.demoStep('Verificando campo de email');
    cy.get('input[name="email"]').should('be.visible');
    
    cy.demoStep('Verificando campo de assunto');
    cy.get('input[name="subject"]').should('be.visible');
    
    cy.demoStep('Verificando campo de mensagem');
    cy.get('textarea[name="message"]').should('be.visible');
    
    cy.demoStep('Verificando verificação matemática anti-bot');
    cy.get('[data-cy="math-question"]').should('be.visible');
    
    cy.demoStep('Verificando botão de envio');
    cy.get('button[type="submit"]').should('contain', 'Send Message');
    
    cy.demoPause('Todos os elementos do formulário estão presentes! ✅');
  });

  it('⚠️ Deve validar campos obrigatórios', () => {
    cy.log('🔍 TESTE: Validação de campos obrigatórios');
    
    cy.demoStep('Tentando enviar formulário vazio');
    cy.demoClick('button[type="submit"]', 'Clicando em enviar sem preencher campos');
    
    cy.demoStep('Verificando mensagens de erro');
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Subject is required').should('be.visible');
    cy.contains('Message is required').should('be.visible');
    
    cy.demoPause('Validação de campos obrigatórios funcionando! ⚠️');
  });

  it('📧 Deve validar formato de email', () => {
    cy.log('✉️ TESTE: Validação de formato de email');
    
    cy.demoType('input[name="name"]', 'João Silva');
    cy.demoType('input[name="email"]', 'email-invalido'); // Email inválido
    cy.demoType('input[name="subject"]', 'Teste');
    cy.demoType('textarea[name="message"]', 'Mensagem de teste');
    
    cy.demoClick('button[type="submit"]', 'Tentando enviar com email inválido');
    
    cy.demoStep('Verificando mensagem de email inválido');
    cy.contains('Please enter a valid email').should('be.visible');
    
    cy.demoPause('Validação de email funcionando! 📧');
  });

  it('🧮 Deve resolver verificação matemática anti-bot', () => {
    cy.log('🤖 TESTE: Sistema anti-bot com matemática');
    
    cy.demoStep('Preenchendo informações do formulário');
    cy.demoType('input[name="name"]', 'Maria Santos');
    cy.demoType('input[name="email"]', 'maria@exemplo.com');
    cy.demoType('input[name="subject"]', 'Pergunta sobre serviços');
    cy.demoType('textarea[name="message"]', 'Gostaria de saber mais informações sobre os vossos serviços.');
    
    cy.demoStep('Analisando pergunta matemática...');
    cy.get('[data-cy="math-question"]').invoke('text').then((questionText) => {
      cy.log(`📊 Pergunta matemática: ${questionText}`);
      
      // Extrair números e operação da pergunta
      const match = questionText.match(/(\d+)\s*\+\s*(\d+)/);
      if (match) {
        const num1 = parseInt(match[1]);
        const num2 = parseInt(match[2]);
        const answer = num1 + num2;
        
        cy.demoStep(`Calculando: ${num1} + ${num2} = ${answer}`);
        cy.demoType('input[name="mathAnswer"]', answer.toString());
        
        cy.demoPause('Verificação matemática resolvida! 🧮');
      }
    });
    
    cy.demoClick('button[type="submit"]', 'Enviando formulário com verificação correta');
    
    cy.demoStep('Aguardando confirmação de envio...');
    cy.wait('@sendEmail');
    
    cy.demoStep('Verificando mensagem de sucesso');
    cy.contains('Message sent successfully!', { timeout: 10000 }).should('be.visible');
    
    cy.demoPause('Formulário enviado com sucesso! ✅');
  });

  it('❌ Deve mostrar erro para verificação matemática incorreta', () => {
    cy.log('🚫 TESTE: Verificação matemática incorreta');
    
    cy.demoStep('Preenchendo formulário com resposta matemática errada');
    cy.demoType('input[name="name"]', 'Pedro Costa');
    cy.demoType('input[name="email"]', 'pedro@exemplo.com');
    cy.demoType('input[name="subject"]', 'Teste de validação');
    cy.demoType('textarea[name="message"]', 'Testando validação matemática incorreta.');
    
    cy.demoStep('Inserindo resposta matemática incorreta');
    cy.demoType('input[name="mathAnswer"]', '999'); // Resposta obviamente errada
    
    cy.demoClick('button[type="submit"]', 'Tentando enviar com resposta incorreta');
    
    cy.demoStep('Verificando mensagem de erro');
    cy.contains('Incorrect answer').should('be.visible');
    
    cy.demoPause('Sistema anti-bot bloqueou envio incorreto! ❌');
  });

  it('🧹 Deve limpar erros quando utilizador corrige', () => {
    cy.log('🔄 TESTE: Limpeza automática de mensagens de erro');
    
    cy.demoStep('Gerando erro de validação');
    cy.demoClick('button[type="submit"]', 'Gerando erros de validação');
    cy.contains('Name is required').should('be.visible');
    
    cy.demoStep('Corrigindo campo de nome');
    cy.demoType('input[name="name"]', 'Ana');
    
    cy.demoStep('Verificando que erro foi removido');
    cy.contains('Name is required').should('not.exist');
    
    cy.demoPause('Limpeza automática funcionando! 🧹');
  });

  it('⏳ Deve mostrar estado de carregamento durante envio', () => {
    cy.log('⌛ TESTE: Estados de loading durante envio');
    
    // Simular delay no servidor para mostrar loading
    cy.intercept('POST', '**/api/send-email', (req) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            statusCode: 200,
            body: { 
              success: true, 
              message: 'Email enviado com sucesso!',
              messageId: 'demo-msg-456'
            }
          });
        }, 3000); // 3 segundos de delay para demonstração
      });
    }).as('slowSendEmail');
    
    cy.demoStep('Preenchendo formulário completo');
    cy.demoType('input[name="name"]', 'Carlos Ferreira');
    cy.demoType('input[name="email"]', 'carlos@exemplo.com');
    cy.demoType('input[name="subject"]', 'Teste de loading');
    cy.demoType('textarea[name="message"]', 'Testando estado de carregamento.');
    
    cy.demoStep('Resolvendo verificação matemática...');
    cy.solveMathVerification();
    
    cy.demoClick('button[type="submit"]', 'Enviando formulário');
    
    cy.demoStep('Verificando estado de carregamento');
    cy.contains('Sending...').should('be.visible');
    cy.get('button[type="submit"]').should('be.disabled');
    
    cy.demoStep('Aguardando conclusão do envio...');
    cy.wait('@slowSendEmail');
    
    cy.demoStep('Verificando conclusão');
    cy.contains('Message sent successfully!').should('be.visible');
    
    cy.demoPause('Estado de loading demonstrado com sucesso! ⏳');
  });

  it('📱 Deve funcionar corretamente em dispositivos móveis', () => {
    cy.log('📱 TESTE: Responsividade em mobile');
    
    cy.demoStep('Mudando para viewport mobile');
    cy.viewport('iphone-x');
    
    cy.demoStep('Verificando elementos em mobile');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="subject"]').should('be.visible');
    cy.get('textarea[name="message"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    
    cy.demoStep('Testando preenchimento em mobile');
    cy.demoType('input[name="name"]', 'Mobile User');
    cy.demoType('input[name="email"]', 'mobile@exemplo.com');
    
    cy.demoPause('Layout mobile funcionando perfeitamente! 📱');
  });
});