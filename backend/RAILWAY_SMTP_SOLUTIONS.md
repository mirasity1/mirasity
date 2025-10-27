# Soluções para SMTP no Railway

## Problema Identificado
✅ **SMTP funciona localmente**  
❌ **Railway bloqueia conexões SMTP diretas**

## Soluções Possíveis:

### 1. SendGrid (Recomendado)
```bash
# Variables no Railway:
SENDGRID_API_KEY=sua-api-key-sendgrid
SMTP_PROVIDER=sendgrid
```

### 2. Mailgun 
```bash
MAILGUN_API_KEY=sua-api-key
MAILGUN_DOMAIN=seu-dominio.mailgun.org
SMTP_PROVIDER=mailgun
```

### 3. Resend (Moderno e simples)
```bash
RESEND_API_KEY=sua-api-key
SMTP_PROVIDER=resend
```

### 4. SMTP Relay via APIs (sem porta SMTP)
Usar APIs HTTP em vez de SMTP tradicional.

## Implementação
Código já preparado para múltiplos provedores.
Basta alterar SMTP_PROVIDER no Railway.