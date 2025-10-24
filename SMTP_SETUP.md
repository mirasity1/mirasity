# 📧 Configuração de SMTP para o Portfolio

Configurei três opções diferentes para você enviar emails através do formulário de contato:

## 🚀 Opções de Configuração

### 1. **Backend com Node.js + Nodemailer** (Recomendado)
O mais robusto e confiável para produção.

#### Configuração:
```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Copie o arquivo de ambiente
cp .env.example .env

# Configure suas credenciais no arquivo .env
```

#### Para Gmail:
1. Ative a verificação em duas etapas na sua conta Google
2. Gere uma senha de app específica: https://myaccount.google.com/apppasswords
3. Use essa senha no arquivo `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=filipe.ac.braga@gmail.com
SMTP_PASS=sua-senha-de-app-gerada
```

#### Execute o backend:
```bash
npm run dev  # Para desenvolvimento
npm start    # Para produção
```

### 2. **EmailJS** (Mais Simples)
Funciona direto no frontend, sem backend necessário.

#### Configuração:
1. Crie uma conta em https://www.emailjs.com/
2. Configure um serviço (Gmail, Outlook, etc.)
3. Crie um template de email
4. Instale a dependência:
```bash
npm install @emailjs/browser
```

5. Configure as variáveis no `.env`:
```env
REACT_APP_EMAILJS_SERVICE_ID=seu_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=seu_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=sua_public_key
```

6. No arquivo `src/services/emailService.js`, descomente a linha:
```javascript
await emailService.sendEmailWithEmailJS(formData);
```

### 3. **Netlify Functions** (Para deploy no Netlify)
Se você fizer deploy no Netlify, pode usar suas funções serverless.

## 🔧 Como Usar

### Método Atual
O formulário está configurado para usar o **backend Node.js** por padrão. 

Para trocar de método, edite o arquivo `src/services/emailService.js` na função `handleSubmit`:

```javascript
// Opção 1: Backend próprio (padrão)
await emailService.sendEmail(formData);

// Opção 2: EmailJS (descomente para usar)
// await emailService.sendEmailWithEmailJS(formData);

// Opção 3: Netlify Functions (descomente para usar)
// await emailService.sendEmailWithNetlify(formData);
```

## 🎨 Funcionalidades Implementadas

✅ **Validação completa** do formulário
✅ **Mensagens de erro** em tempo real
✅ **Feedback visual** (sucesso/erro)
✅ **Loading state** durante envio
✅ **Limpeza automática** do formulário após sucesso
✅ **Tradução completa** PT/EN
✅ **Design responsivo** e animado
✅ **Template HTML** bonito para emails

## 🛠️ Personalização

### Configurar seu SMTP
Edite o arquivo `.env` com suas credenciais:

```env
# Para outros provedores
SMTP_HOST=smtp.seu-provedor.com
SMTP_PORT=587
SMTP_USER=seu-email@dominio.com
SMTP_PASS=sua-senha
```

### Personalizar template do email
Edite a função `generateEmailHTML` em `src/services/emailService.js`

### Adicionar validações extras
Edite a função `validateForm` em `src/services/emailService.js`

## 🚀 Deploy

### Frontend (Netlify/Vercel)
O frontend funciona normalmente. Apenas configure as variáveis de ambiente na plataforma.

### Backend (Heroku/Railway/DigitalOcean)
1. Faça deploy da pasta `backend/`
2. Configure as variáveis de ambiente na plataforma
3. Atualize `REACT_APP_API_URL` no frontend

## 📱 Teste

1. Preencha o formulário
2. Verifique o console do navegador
3. Confirme o recebimento do email
4. Teste a validação deixando campos vazios

## 🆘 Resolução de Problemas

### "Failed to send email"
- Verifique suas credenciais SMTP
- Confirme que o backend está rodando
- Teste com outro provedor de email

### "CORS Error"
- Adicione seu domínio nas configurações CORS do backend
- Para desenvolvimento, o CORS já está liberado

### Gmail "Less secure apps"
- Use senha de app em vez da senha normal
- Verifique se a verificação em duas etapas está ativa

## 📞 Suporte

Qualquer dúvida, é só falar! Estou aqui para ajudar com a configuração do seu SMTP específico.