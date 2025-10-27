# 🚀 Railway Deployment - Troubleshooting Guide

## 🎯 Problema Identificado
**Erro**: `npm ci` falhando durante o build no Railway
**Causa**: Configurações inadequadas para ambiente de produção

## ✅ Soluções Implementadas

### 1. **Configuração Nixpacks Otimizada**
```toml
# nixpacks.toml
[phases.setup]
nixPkgs = ["nodejs_20", "npm-10_x"]

[phases.install]
cmds = [
  "cd backend",
  "npm ci --only=production --no-audit --no-fund"
]

[phases.build]
cmds = [
  "cd backend", 
  "npm run build"
]

[start]
cmd = "cd backend && npm run railway:start"
```

### 2. **Railway.json Melhorado**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "buildCommand": "cd backend && npm ci --only=production"
  },
  "deploy": {
    "startCommand": "cd backend && npm run railway:start"
  }
}
```

### 3. **Package.json com Script de Produção**
```json
"scripts": {
  "railway:start": "NODE_ENV=production node server.js"
}
```

### 4. **Railway Ignore para Otimização**
Criado `.railwayignore` para excluir:
- Frontend files desnecessários
- Testes e documentação
- Scripts de desenvolvimento
- Arquivos temporários

### 5. **Vulnerabilidades Corrigidas**
- Nodemailer atualizado para versão segura (7.0.10)
- Audit limpo: 0 vulnerabilidades

## 🔧 Variáveis de Ambiente Railway

**Certifica-te que estão configuradas:**

```bash
# SMTP Configuration
SMTP_HOST=heracles.mxrouting.net
SMTP_PORT=587
SMTP_USER=no-reply@mirasity.pt
SMTP_PASS=z3MVsrwZZBStd6ecAjPw
SMTP_PROVIDER=mxrouting

# Environment
NODE_ENV=production
PORT=3001

# Frontend URL (Railway auto-detecta, mas pode ser definido)
FRONTEND_URL=https://mirasity.vercel.app

# Discord Webhook (opcional)
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."
```

## 🚦 Próximos Passos para Deploy

### 1. **Verificar Configurações**
- ✅ Nixpacks.toml atualizado
- ✅ Railway.json otimizado  
- ✅ Package.json com scripts corretos
- ✅ Vulnerabilidades corrigidas
- ✅ .railwayignore criado

### 2. **Commit e Push**
```bash
git add .
git commit -m "fix: otimizar configuração Railway para produção

- Atualizar nixpacks.toml com configurações otimizadas
- Corrigir railway.json para ambiente de produção
- Adicionar script railway:start no package.json
- Criar .railwayignore para reduzir tamanho do build
- Corrigir vulnerabilidade do nodemailer (7.0.10)
- Melhorar configurações de npm ci"

git push origin loginProject
```

### 3. **Fazer Deploy**
O Railway deve agora conseguir:
1. **Setup**: Instalar Node.js 20 + npm
2. **Install**: Executar `npm ci --only=production` no backend
3. **Build**: Preparar ambiente de produção
4. **Start**: Iniciar servidor com `npm run railway:start`

## 🔍 Verificar After Deploy

### URLs para Testar:
- `https://your-railway-url/health` - Health check
- `https://your-railway-url/api/test` - API info
- `https://your-railway-url/api/login` - POST test

### Logs Importantes:
```bash
# Sucesso esperado nos logs:
✅ Servidor rodando na porta 3001
✅ Environment: production  
✅ MXroute SMTP API configurado
✅ Rotas disponíveis listadas
```

## 🚨 Se Ainda Falhar

### Debug Steps:
1. **Verificar logs completos** no Railway Dashboard
2. **Confirmar variáveis de ambiente** estão definidas
3. **Validar package-lock.json** está presente no backend/
4. **Testar build local** com `cd backend && npm ci --only=production`

### Fallback Configuration:
Se o nixpacks falhar, usar Dockerfile:

```dockerfile
# Dockerfile na raiz do projeto
FROM node:20-alpine

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./
EXPOSE 3001

CMD ["npm", "run", "railway:start"]
```

## ✅ Resumo das Correções

**Antes:**
- ❌ npm ci falhava
- ❌ Configurações inadequadas
- ❌ Vulnerabilidades de segurança

**Depois:**
- ✅ Build otimizado para produção
- ✅ Scripts específicos para Railway
- ✅ Dependências seguras e atualizadas
- ✅ Configuração limpa e eficiente

**Resultado esperado:** Deploy bem-sucedido no Railway! 🚀