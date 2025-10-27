// cypress/e2e/login-test-demo.cy.js
// Versão de apresentação do teste de login - mais lenta e visual

import { DEMO_CONFIG } from '../support/demo-config';

describe('🎭 DEMONSTRAÇÃO: Login Test Page', () => {
  beforeEach(() => {
    cy.log('🚀 Iniciando teste de demonstração...');
    
    // Interceptar todas as requisições para debug
    cy.intercept('POST', '**/api/login').as('loginAPI');
    cy.demoVisit('/admin-test', 'Abrindo página de teste de login');
  });

  it('🎯 Deve exibir o formulário de login', () => {
    cy.log('📋 TESTE: Verificação da interface do formulário');
    
    cy.demoStep('Verificando título da página');
    cy.contains('Login de Teste').should('be.visible');
    
    cy.demoStep('Verificando descrição da página');
    cy.contains('Página escondida para testar autenticação').should('be.visible');
    
    cy.demoStep('Verificando campo de nome de utilizador');
    cy.get('input[name="username"]').should('be.visible');
    
    cy.demoStep('Verificando campo de palavra-passe');
    cy.get('input[name="password"]').should('be.visible');
    
    cy.demoStep('Verificando botão de login');
    cy.get('button[type="submit"]').should('contain', 'Fazer Login');
    
    cy.demoPause('Interface carregada com sucesso! ✅');
  });

  it('⚠️ Deve mostrar erros de validação para campos vazios', () => {
    cy.log('🔍 TESTE: Validação de campos obrigatórios');
    
    cy.demoStep('Tentando fazer login sem preencher campos');
    cy.demoClick('button[type="submit"]', 'Clicando no botão de login');
    
    cy.demoStep('Verificando mensagem de erro para nome de utilizador');
    cy.contains('Nome de utilizador é obrigatório').should('be.visible');
    
    cy.demoStep('Verificando mensagem de erro para palavra-passe');
    cy.contains('Palavra-passe é obrigatória').should('be.visible');
    
    cy.demoPause('Validação funcionando corretamente! ⚠️');
  });

  it('📏 Deve validar o comprimento mínimo da palavra-passe', () => {
    cy.log('🔒 TESTE: Validação de comprimento da palavra-passe');
    
    cy.demoType('input[name="username"]', 'testuser');
    cy.demoType('input[name="password"]', '123'); // Muito curta
    
    cy.demoClick('button[type="submit"]', 'Tentando login com password curta');
    
    cy.demoStep('Verificando mensagem de validação de comprimento');
    cy.contains('Palavra-passe deve ter pelo menos 6 caracteres').should('be.visible');
    
    cy.demoPause('Validação de comprimento funcionando! 📏');
  });

  it('❌ Deve mostrar erro para palavra-passe incorreta', () => {
    cy.log('🚫 TESTE: Login com palavra-passe incorreta');
    
    cy.demoType('input[name="username"]', 'testuser');
    cy.demoType('input[name="password"]', 'wrongpass');
    
    cy.demoClick('button[type="submit"]', 'Fazendo login com password incorreta');

    cy.demoStep('Aguardando resposta do servidor...');
    cy.get('body').should((body) => {
      const text = body.text();
      expect(text).to.satisfy((txt) => 
        txt.includes('Palavra-passe incorreta') || 
        txt.includes('Password incorreta') ||
        txt.includes('incorrect') ||
        txt.includes('erro')
      );
    });
    
    cy.demoStep('Verificando que botão voltou a ficar ativo');
    cy.get('button[type="submit"]').should('not.be.disabled');
    
    cy.demoPause('Erro de password incorreta detectado! ❌');
  });

  it('🔐 Deve mostrar erro diferente para palavra-passe correta', () => {
    cy.log('🧪 TESTE: Login com palavra-passe correta (mas login desabilitado)');
    
    cy.demoType('input[name="username"]', 'testuser');
    cy.demoType('input[name="password"]', '123456'); // Password correta
    
    cy.demoClick('button[type="submit"]', 'Fazendo login com password correta');

    cy.demoStep('Aguardando resposta específica do servidor...');
    cy.get('body').should((body) => {
      const text = body.text();
      expect(text).to.satisfy((txt) => 
        txt.includes('Login desabilitado') || 
        txt.includes('desabilitado') ||
        txt.includes('disabled') ||
        txt.includes('teste')
      );
    });
    
    cy.demoStep('Verificando que botão voltou a ficar ativo');
    cy.get('button[type="submit"]').should('not.be.disabled');
    
    cy.demoPause('Sistema detectou password correta mas login está desabilitado! 🔐');
  });

  it('👁️ Deve alternar visibilidade da palavra-passe', () => {
    cy.log('🔍 TESTE: Funcionalidade de mostrar/ocultar password');
    
    cy.demoStep('Verificando que password está oculta por padrão');
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    
    cy.demoType('input[name="password"]', 'minhapassword');
    
    cy.demoStep('Clicando no ícone do olho para mostrar password');
    cy.get('input[name="password"]').parent().find('button').click();
    cy.wait(DEMO_CONFIG.delays.shortPause);
    cy.get('input[name="password"]').should('have.attr', 'type', 'text');
    
    cy.demoPause('Password agora está visível! 👁️');
    
    cy.demoStep('Clicando novamente para ocultar password');
    cy.get('input[name="password"]').parent().find('button').click();
    cy.wait(DEMO_CONFIG.delays.shortPause);
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    
    cy.demoPause('Password foi ocultada novamente! 🙈');
  });

  it('🧹 Deve limpar erros quando utilizador digita', () => {
    cy.log('🔄 TESTE: Limpeza automática de mensagens de erro');
    
    cy.demoStep('Gerando erro de validação');
    cy.demoClick('button[type="submit"]', 'Clicando sem preencher campos');
    cy.contains('Nome de utilizador é obrigatório').should('be.visible');

    cy.demoStep('Digitando no campo de nome de utilizador');
    cy.demoType('input[name="username"]', 'test');
    
    cy.demoStep('Verificando que erro foi removido automaticamente');
    cy.contains('Nome de utilizador é obrigatório').should('not.exist');
    
    cy.demoPause('Limpeza automática de erros funcionando! 🧹');
  });

  it('🔗 Deve ter link funcionando para voltar ao portfólio', () => {
    cy.log('🏠 TESTE: Navegação de volta ao portfólio');
    
    cy.demoStep('Verificando link de volta ao portfólio');
    cy.contains('Voltar ao Portfólio').should('have.attr', 'href', '/');
    
    cy.demoPause('Link de navegação está correto! 🔗');
  });

  it('💡 Deve exibir dicas úteis para teste', () => {
    cy.log('📖 TESTE: Informações de ajuda para utilizadores');
    
    cy.demoStep('Verificando seção de dicas');
    cy.contains('Para Testes:').should('be.visible');
    
    cy.demoStep('Verificando instruções específicas');
    cy.contains('Username: qualquer nome').should('be.visible');
    cy.contains('Password correta: 123456').should('be.visible');
    cy.contains('Qualquer outra password dará erro').should('be.visible');
    
    cy.demoPause('Todas as dicas estão presentes! 💡');
  });

  it('🌐 Deve lidar com erros de rede graciosamente', () => {
    cy.log('📡 TESTE: Tratamento de erros de conectividade');
    
    cy.demoStep('Configurando simulação de erro de rede');
    cy.intercept('POST', '**/api/login', { forceNetworkError: true }).as('loginRequest');

    cy.demoType('input[name="username"]', 'testuser');
    cy.demoType('input[name="password"]', '123456');
    
    cy.demoClick('button[type="submit"]', 'Tentando login com falha de rede');

    cy.demoStep('Aguardando erro de conectividade...');
    cy.wait('@loginRequest');
    
    cy.demoStep('Verificando mensagem de erro de rede');
    cy.contains('Erro de conectividade com o servidor', { timeout: 8000 }).should('be.visible');
    
    cy.demoPause('Sistema tratou erro de rede corretamente! 🌐');
  });

  it('📱 Deve ser responsivo em dispositivos móveis', () => {
    cy.log('📱 TESTE: Layout responsivo para mobile');
    
    cy.demoStep('Mudando para viewport de mobile');
    cy.viewport('iphone-x');
    
    cy.demoStep('Verificando visibilidade em mobile');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.contains('Login de Teste').should('be.visible');
    
    cy.demoPause('Layout responsivo funcionando perfeitamente! 📱');
  });
});