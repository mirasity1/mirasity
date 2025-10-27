#!/bin/bash

echo "🎭 MODO APRESENTAÇÃO - TESTES DEMONSTRATIVOS"
echo "============================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎯 Este script executa os testes em modo de apresentação${NC}"
echo -e "${CYAN}   • Testes mais lentos e visuais${NC}"
echo -e "${CYAN}   • Descrições detalhadas de cada passo${NC}"
echo -e "${CYAN}   • Pausas para observação${NC}"
echo -e "${CYAN}   • Destaque visual dos elementos${NC}"
echo ""

echo -e "${YELLOW}📋 Opções disponíveis:${NC}"
echo "1. 🔐 Teste de Login (Demonstração)"
echo "2. 📧 Teste de Formulário de Contacto (Demonstração)"
echo "3. 🧪 Teste de API (Demonstração)"
echo "4. 🎬 Todos os testes de demonstração"
echo "5. ⚡ Testes normais (rápidos)"
echo ""

read -p "Escolha uma opção (1-5): " choice

case $choice in
  1)
    echo -e "${GREEN}🔐 Executando Teste de Login em Modo Apresentação...${NC}"
    echo ""
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/login-test-demo.cy.js" --browser chrome --headed --no-exit
    ;;
  2)
    echo -e "${GREEN}📧 Executando Teste de Formulário em Modo Apresentação...${NC}"
    echo ""
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/contact-form-demo.cy.js" --browser chrome --headed --no-exit
    ;;
  3)
    echo -e "${GREEN}🧪 Executando Teste de API em Modo Apresentação...${NC}"
    echo ""
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/api-test.cy.js" --browser chrome --headed --no-exit
    ;;
  4)
    echo -e "${GREEN}🎬 Executando TODOS os testes de demonstração...${NC}"
    echo ""
    echo -e "${BLUE}Iniciando sequência completa de demonstração...${NC}"
    echo ""
    
    echo -e "${CYAN}🔐 1/3 - Teste de Login...${NC}"
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/login-test-demo.cy.js" --browser chrome --headed --no-exit
    
    echo ""
    echo -e "${CYAN}📧 2/3 - Teste de Formulário...${NC}"
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/contact-form-demo.cy.js" --browser chrome --headed --no-exit
    
    echo ""
    echo -e "${CYAN}🧪 3/3 - Teste de API...${NC}"
    CYPRESS_DEMO_MODE=true npx cypress run --spec "cypress/e2e/api-test.cy.js" --browser chrome --headed --no-exit
    ;;
  5)
    echo -e "${GREEN}⚡ Executando testes normais (rápidos)...${NC}"
    echo ""
    npx cypress run --browser chrome --headless
    ;;
  *)
    echo -e "${RED}❌ Opção inválida. Escolha entre 1-5.${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}✅ Demonstração concluída!${NC}"
echo -e "${BLUE}💡 Dica: Para executar novamente, use: ./demo-cypress.sh${NC}"