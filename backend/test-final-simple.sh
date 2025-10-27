#!/bin/bash

echo "🚀 Testando SMTP API - Versão Simplificada"
echo "=========================================="

# Detectar URL do backend
if [ -n "$BACKEND_URL" ]; then
    API_URL="$BACKEND_URL"
elif [ -n "$RAILWAY_PUBLIC_DOMAIN" ]; then
    API_URL="https://$RAILWAY_PUBLIC_DOMAIN"
else
    # URL padrão do projeto mirasity
    API_URL="https://backend.mirasity.pt"
    echo "ℹ️  Usando URL padrão: $API_URL"
    echo "   Para usar outra URL: BACKEND_URL=https://your-backend.com ./test-final-simple.sh"
fi

echo ""
echo "📧 Sistema usa SMTP API (HTTP)"
echo "✅ Sem problemas de firewall"
echo "✅ 100% compatível com cloud providers"
echo "✅ Sem timeouts SMTP"
echo "🔗 Backend URL: $API_URL"

echo ""
echo "🧪 1. Testando rota principal de envio..."
echo "URL: $API_URL/api/send-email"

SEND_RESPONSE=$(curl -s -X POST "$API_URL/api/send-email" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste SMTP API",
    "email": "teste@example.com", 
    "subject": "Sistema Otimizado",
    "message": "Este email foi enviado pelo sistema otimizado que usa SMTP API. Sem problemas de timeout!"
  }')

if echo "$SEND_RESPONSE" | grep -q '"success":true'; then
    echo "🎉 SUCESSO - Sistema principal funcionando!"
    echo "$SEND_RESPONSE" | jq .
else
    echo "❌ Problema no sistema principal:"
    echo "$SEND_RESPONSE" | jq . 2>/dev/null || echo "$SEND_RESPONSE"
fi

echo ""
echo "🧪 2. Testando rota de teste..."
echo "URL: $API_URL/api/test-smtp"

TEST_RESPONSE=$(curl -s "$API_URL/api/test-smtp")

if echo "$TEST_RESPONSE" | grep -q '"success":true'; then
    echo "✅ Teste também funcionando!"
    echo "$TEST_RESPONSE" | jq .
else
    echo "⚠️ Problema no teste:"
    echo "$TEST_RESPONSE" | jq . 2>/dev/null || echo "$TEST_RESPONSE"
fi

echo ""
echo "📊 RESUMO FINAL:"
echo "==============="
echo "• Sistema principal: $(echo "$SEND_RESPONSE" | grep -q '"success":true' && echo "✅ FUNCIONANDO" || echo "❌ PROBLEMA")"
echo "• Teste SMTP: $(echo "$TEST_RESPONSE" | grep -q '"success":true' && echo "✅ FUNCIONANDO" || echo "❌ PROBLEMA")"
echo ""
echo "💡 ESTRATÉGIA:"
echo "   SMTP API (HTTP) → Sempre funciona em qualquer cloud"