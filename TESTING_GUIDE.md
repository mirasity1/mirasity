# 🧪 Guia Completo de Testes - Portfolio mirasity.pt

Este documento explica como executar e entender todos os tipos de testes implementados no projeto.

## 📋 Tipos de Testes Implementados

### 1. 🎯 **Testes Unitários (Frontend)**
- **Ferramentas:** Jest + React Testing Library
- **Localização:** `src/__tests__/`
- **O que testam:** Componentes individuais, funções, lógica isolada

### 2. 🔗 **Testes de Integração**
- **Ferramentas:** Jest + Supertest
- **Localização:** `backend/__tests__/`
- **O que testam:** APIs, base de dados, serviços externos

### 3. 🌐 **Testes End-to-End (E2E)**
- **Ferramentas:** Cypress
- **Localização:** `cypress/e2e/`
- **O que testam:** Fluxos completos do utilizador

### 4. 📊 **Testes de Performance**
- **Ferramentas:** Lighthouse CI
- **O que testam:** Velocidade, acessibilidade, SEO, boas práticas

## 🚀 Como Executar os Testes

### Frontend (React)
```bash
# Testes básicos
npm test

# Testes com coverage
npm run test:coverage

# Testes para CI (sem watch)
npm run test:ci
```

### Backend (Node.js)
```bash
# Navegar para pasta backend
cd backend

# Instalar dependências (primeira vez)
npm install

# Executar testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### E2E (Cypress)
```bash
# Interface gráfica (desenvolvimento)
npm run cypress:open

# Modo headless (CI)
npm run cypress:run

# E2E com servidor automático
npm run test:e2e

# E2E com interface gráfica
npm run test:e2e:open
```

### Todos os Testes
```bash
# Executar suite completa
npm run test:all
```

## 📁 Estrutura dos Testes

```
portfolio/
├── src/
│   └── __tests__/              # Testes frontend
│       ├── Contact.test.js     # Teste do formulário
│       └── emailService.test.js # Teste do serviço email
├── backend/
│   └── __tests__/              # Testes backend
│       └── server.test.js      # Teste APIs e integração
├── cypress/
│   ├── e2e/                    # Testes E2E
│   │   └── contact-form.cy.js  # Teste fluxo completo
│   └── support/                # Comandos personalizados
└── .github/
    └── workflows/
        └── test.yml            # CI/CD automático
```

## 🎓 O que Cada Teste Ensina

### Contact.test.js (Frontend)
```javascript
// Aprende sobre:
- Renderização de componentes React
- Simulação de interações do utilizador
- Validação de formulários
- Estados de loading/error
- Mocking de serviços externos
```

### emailService.test.js (Integração)
```javascript
// Aprende sobre:
- Testes de APIs fetch
- Mocking de respostas HTTP
- Validação de dados
- Tratamento de erros de rede
```

### server.test.js (Backend)
```javascript
// Aprende sobre:
- Testes de endpoints Express
- Mocking de serviços externos (nodemailer)
- Validação de middleware
- Testes de segurança (CORS, headers)
- Rate limiting
```

### contact-form.cy.js (E2E)
```javascript
// Aprende sobre:
- Simulação de utilizador real
- Navegação entre páginas
- Preenchimento de formulários
- Intercetação de requests HTTP
- Testes responsivos
- Testes de acessibilidade
```

## 📊 Métricas de Coverage

### Configuração Atual:
- **Branches:** 70% mínimo
- **Functions:** 70% mínimo  
- **Lines:** 70% mínimo
- **Statements:** 70% mínimo

### Como Ver Coverage:
```bash
# Frontend
npm run test:coverage
# Abre: coverage/lcov-report/index.html

# Backend
cd backend && npm run test:coverage
# Abre: backend/coverage/lcov-report/index.html
```

## 🔄 CI/CD Automático

### GitHub Actions (`.github/workflows/test.yml`):
1. **Push/PR** → Executar todos os testes
2. **Frontend tests** → Jest + Coverage
3. **Backend tests** → Supertest + Coverage
4. **E2E tests** → Cypress
5. **Build test** → Verificar se compila
6. **Lighthouse audit** → Performance

### Status Badges:
```markdown
![Tests](https://github.com/mirasity1/mirasity/workflows/Test%20Suite/badge.svg)
```

## 🛠️ Comandos Úteis para Desenvolvimento

### Debug de Testes:
```bash
# Frontend - debug específico
npm test -- Contact.test.js --verbose

# Backend - debug com logs
cd backend && npm test -- --verbose

# E2E - debug no browser
npm run cypress:open
```

### Atualizar Snapshots:
```bash
# Se usar snapshots (não implementado ainda)
npm test -- --updateSnapshot
```

### Testes em Modo Watch:
```bash
# Frontend (automático)
npm test

# Backend
cd backend && npm run test:watch
```

## 🎯 Cenários de Teste Implementados

### ✅ Contact Form:
- [x] Renderização correta
- [x] Validação de campos obrigatórios
- [x] Validação de email
- [x] Submissão com sucesso
- [x] Tratamento de erros
- [x] Estados de loading
- [x] Limpeza de erros ao digitar

### ✅ Backend API:
- [x] Envio de email SMTP
- [x] Webhook Discord
- [x] Validação de dados
- [x] Rate limiting
- [x] Headers de segurança
- [x] Tratamento de erros

### ✅ E2E Flow:
- [x] Navegação completa
- [x] Preenchimento de formulário
- [x] Submissão com intercetação
- [x] Estados de sucesso/erro
- [x] Responsividade
- [x] Acessibilidade

## 🚀 Próximos Passos

1. **Testes de Snapshot** para componentes UI
2. **Testes de Performance** com Web Vitals
3. **Testes de Acessibilidade** automatizados
4. **Testes de Segurança** com OWASP
5. **Testes de Load** para o backend

## 📝 Boas Práticas Aprendidas

### ✅ Estrutura AAA:
```javascript
// Arrange (Preparar)
const user = userEvent.setup();
render(<Component />);

// Act (Executar)
await user.click(button);

// Assert (Verificar)
expect(result).toBe(expected);
```

### ✅ Mocking Eficaz:
```javascript
// Mock apenas o necessário
jest.mock('../services/emailService', () => ({
  sendEmail: jest.fn()
}));
```

### ✅ Testes Limpos:
```javascript
// Cleanup após cada teste
beforeEach(() => {
  jest.clearAllMocks();
});
```

---

## 💡 **Para aprender mais:**
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Supertest Guide](https://github.com/ladjs/supertest)

**Happy Testing! 🧪✨**