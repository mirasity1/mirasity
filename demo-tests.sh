#!/bin/bash

echo "🧪 DEMO DE TESTES AUTOMATIZADOS - Portfolio mirasity.pt"
echo "=================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📋 Suite de Testes Implementada:${NC}"
echo "✅ Testes Frontend (React Testing Library + Jest)"
echo "✅ Testes Backend (Supertest + Jest)"  
echo "✅ Testes E2E (Cypress)"
echo "✅ CI/CD (GitHub Actions)"
echo ""

echo -e "${YELLOW}🎯 Para testar o formulário de contacto:${NC}"
echo ""

echo -e "${GREEN}1. Testes Frontend (Componente Contact):${NC}"
echo "   npm test -- Contact.test.js"
echo "   • Validação de campos obrigatórios"
echo "   • Validação de email inválido"
echo "   • Submissão com sucesso"
echo "   • Tratamento de erros"
echo "   • Estados de loading"
echo ""

echo -e "${GREEN}2. Testes Backend (API /api/contact):${NC}"
echo "   cd backend && npm test"
echo "   • Envio de email SMTP"
echo "   • Webhook Discord"
echo "   • Rate limiting"
echo "   • Validação de dados"
echo "   • Headers de segurança"
echo ""

echo -e "${GREEN}3. Testes E2E (Fluxo completo):${NC}"
echo "   npm run test:e2e:open"
echo "   • Preenchimento do formulário"
echo "   • Navegação entre secções"
echo "   • Responsividade"
echo "   • Acessibilidade"
echo ""

echo -e "${GREEN}4. Todos os testes:${NC}"
echo "   npm run test:all"
echo ""

echo -e "${BLUE}📊 Coverage Report:${NC}"
echo "   npm run test:coverage"
echo "   • Abre relatório HTML com coverage detalhado"
echo ""

echo -e "${BLUE}🔄 CI/CD Automático:${NC}"
echo "   • Push/PR → Executa todos os testes automaticamente"
echo "   • Lighthouse audit para performance"
echo "   • Coverage reporting"
echo ""

echo -e "${YELLOW}💡 Ficheiros de aprendizagem criados:${NC}"
echo "   📖 TESTING_GUIDE.md - Guia completo"
echo "   🧪 src/__tests__/ - Testes frontend"
echo "   🔧 backend/__tests__/ - Testes backend"
echo "   🌐 cypress/e2e/ - Testes E2E"
echo ""

echo -e "${GREEN}🚀 Para começar a aprender:${NC}"
echo "1. Leia o TESTING_GUIDE.md"
echo "2. Execute: npm test"
echo "3. Veja os testes a funcionar!"
echo "4. Modifique um teste para ver falhar"
echo "5. Experimente o Cypress: npm run cypress:open"
echo ""

echo "=================================================="
echo -e "${GREEN}✨ Testes implementados com sucesso! ✨${NC}"