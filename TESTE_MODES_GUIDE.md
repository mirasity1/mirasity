# 🧪 GUIA DE EXECUÇÃO DOS TESTES

## 🚀 Modo Normal (Rápido)

Para execução rápida de todos os testes:

```bash
# Todos os testes (frontend + backend + e2e)
./run-all-tests.sh

# Ou comandos individuais:
npm test                    # Frontend unit tests
cd backend && npm test      # Backend integration tests  
npx cypress run            # E2E tests rápidos
```

## 🎭 Modo Demonstração (Lento + Visual)

Para apresentações com efeitos visuais:

```bash
# Apenas testes de demonstração
./run-demo-tests.sh

# Ou definir manualmente:
CYPRESS_DEMO_MODE=true npx cypress run --env DEMO_MODE=true --spec "cypress/e2e/*-demo.cy.js"
```

## 🔧 Configurações

### Modo Normal
- ✅ Execução rápida
- ✅ Sem delays visuais  
- ✅ Ideal para desenvolvimento
- ✅ Usado no CI/CD

### Modo Demo
- 🎯 Efeitos visuais
- ⏳ Delays entre ações
- 🎨 Highlighting de elementos
- 📝 Logs detalhados de passos
- 🎭 Ideal para apresentações

## 📁 Arquivos de Teste

```
cypress/e2e/
├── *-demo.cy.js         # Testes de demonstração (lentos)
├── *.cy.js              # Testes normais (rápidos)
└── api-test.cy.js       # Testes de API (sempre rápidos)
```

## ⚡ Ativação do Modo Demo

O modo demonstração só é ativado quando:
- `CYPRESS_DEMO_MODE=true` (variável de ambiente)
- `--env DEMO_MODE=true` (parâmetro Cypress)
- Usando `./run-demo-tests.sh`

**Por padrão, todos os testes executam em modo normal (rápido).**