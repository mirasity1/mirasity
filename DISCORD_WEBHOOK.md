# Configuração do Discord Webhook

## Como configurar notificações no Discord

1. **Criar um Webhook no Discord:**
   - Vá para o seu servidor Discord
   - Clique em `Server Settings` (configurações do servidor)
   - Na sidebar, clique em `Integrations`
   - Clique em `Webhooks`
   - Clique em `New Webhook`
   - Defina um nome (ex: "Portfolio Bot")
   - Escolha o canal onde as mensagens aparecerão
   - Copie a **Webhook URL**

2. **Configurar no Backend:**
   ```bash
   # No arquivo .env do backend (não commitar!)
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN
   ```

3. **Testar o Webhook:**
   ```bash
   # No backend, você pode testar com:
   curl -X POST "http://localhost:3001/api/discord-webhook" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Teste",
       "email": "teste@example.com", 
       "subject": "Teste Discord",
       "message": "Esta é uma mensagem de teste"
     }'
   ```

## Como funciona

1. **Usuário preenche formulário** → Frontend envia dados para backend
2. **Backend recebe dados** → Envia webhook para Discord (primeiro)
3. **Backend envia email** → Depois envia email normal
4. **Discord recebe notificação** → Mensagem rica com todos os dados

## Formato da mensagem no Discord

A mensagem aparecerá como um embed rico com:
- 🚨 **Novo contacto recebido!**
- 👤 **Nome:** Nome do visitante
- 📧 **Email:** Email de contacto  
- 📋 **Assunto:** Assunto da mensagem
- 💬 **Mensagem:** Conteúdo completo (truncado se > 1000 chars)
- ⏰ **Timestamp:** Data e hora
- 🌐 **Footer:** "Portfolio mirasity.pt"

## Benefícios

- ✅ **Notificação instantânea** no Discord quando alguém entra em contacto
- ✅ **Backup das mensagens** mesmo se o email falhar
- ✅ **Não quebra o fluxo** - se Discord falhar, email ainda funciona
- ✅ **Formato rico** com emojis e organização visual
- ✅ **Fácil de configurar** - apenas uma URL de webhook

## Segurança

- ⚠️ **Nunca commitar** a URL do webhook no Git
- ⚠️ **Usar variáveis de ambiente** para a URL
- ✅ **Webhook opcional** - se não configurado, sistema continua funcionando
- ✅ **Validação de dados** antes de enviar para Discord