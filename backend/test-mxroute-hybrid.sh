#!/bin/bash

echo "🚀 Testando MXroute no Railway - Estratégia Híbrida"
echo "=================================================="

echo ""
echo "1. 📡 Testando MXroute SMTP API (HTTP - sempre funciona)..."
echo "URL: https://backend.mirasity.pt/api/test-mxroute-api"

API_RESPONSE=$(curl -s "https://backend.mirasity.pt/api/test-mxroute-api")

if echo "$API_RESPONSE" | grep -q '"success":true'; then
    echo "✅ SUCESSO - MXroute SMTP API funcionando!"
    echo "$API_RESPONSE" | jq .
    echo ""
    echo "🎯 A API HTTP está funcionando! Emails serão enviados com sucesso."
else
    echo "❌ MXroute SMTP API falhou:"
    echo "$API_RESPONSE" | jq . 2>/dev/null || echo "$API_RESPONSE"
fi

echo ""
echo "2. 📡 Testando SMTP tradicional (pode falhar devido ao firewall)..."
echo "URL: https://backend.mirasity.pt/api/test-smtp"

SMTP_RESPONSE=$(curl -s "https://backend.mirasity.pt/api/test-smtp")

if echo "$SMTP_RESPONSE" | grep -q '"success":true'; then
    echo "✅ BONUS - SMTP tradicional também funciona!"
    echo "$SMTP_RESPONSE" | jq .
else
    echo "⚠️ SMTP tradicional falhou (esperado no Railway):"
    echo "$SMTP_RESPONSE" | jq .error 2>/dev/null || echo "$SMTP_RESPONSE"
fi

echo ""
echo "3. 🧪 Testando envio real através da rota principal..."
echo "URL: https://backend.mirasity.pt/api/send-email"

REAL_TEST_RESPONSE=$(curl -s -X POST "https://backend.mirasity.pt/api/send-email" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Railway Híbrido",
    "email": "teste@example.com",
    "subject": "Teste Sistema Híbrido",
    "message": "Este é um teste do sistema híbrido SMTP + API HTTP no Railway."
  }')

if echo "$REAL_TEST_RESPONSE" | grep -q '"success":true'; then
    echo "🎉 SUCESSO TOTAL - Sistema híbrido funcionando!"
    echo "$REAL_TEST_RESPONSE" | jq .
else
    echo "❌ Teste real falhou:"
    echo "$REAL_TEST_RESPONSE" | jq . 2>/dev/null || echo "$REAL_TEST_RESPONSE"
fi

echo ""
echo "📋 RESUMO:"
echo "========="
echo "• MXroute SMTP API (HTTP): $(echo "$API_RESPONSE" | grep -q '"success":true' && echo "✅ OK" || echo "❌ FALHOU")"
echo "• SMTP Tradicional: $(echo "$SMTP_RESPONSE" | grep -q '"success":true' && echo "✅ OK" || echo "⚠️ BLOQUEADO")"
echo "• Envio Real: $(echo "$REAL_TEST_RESPONSE" | grep -q '"success":true' && echo "🎉 FUNCIONANDO" || echo "❌ PROBLEMA")"
echo ""
echo "💡 Com a estratégia híbrida, mesmo que SMTP tradicional seja bloqueado,"
echo "   a API HTTP garantirá que os emails sejam enviados!"