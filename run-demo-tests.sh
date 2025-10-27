#!/bin/bash

echo "🎭 Executando testes em MODO DEMONSTRAÇÃO"
echo "⚠️  Este modo é mais lento e visual para apresentações"
echo ""

# Definir variável de ambiente para modo demo
export CYPRESS_DEMO_MODE=true

# Executar testes específicos de demonstração
echo "🧪 Executando testes de demonstração..."
npx cypress run --config baseUrl=http://localhost:3000 --env apiUrl=http://localhost:3001,DEMO_MODE=true --spec "cypress/e2e/*-demo.cy.js"

echo ""
echo "🎭 Modo demonstração concluído!"
echo "💡 Para testes rápidos, use: npm test ou ./run-all-tests.sh"