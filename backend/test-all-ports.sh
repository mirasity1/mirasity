#!/bin/bash

echo "🔧 Testando todas as portas SMTP no Railway..."
echo "=========================================="

# Array de portas para testar
PORTS=(2525 587 465 25 26 2526 1025)

for PORT in "${PORTS[@]}"; do
    echo ""
    echo "📡 Testando porta $PORT..."
    echo "URL: https://backend.mirasity.pt/api/test-smtp-port/$PORT"
    
    RESPONSE=$(curl -s "https://backend.mirasity.pt/api/test-smtp-port/$PORT")
    
    if echo "$RESPONSE" | grep -q '"success":true'; then
        echo "✅ SUCESSO na porta $PORT!"
        echo "$RESPONSE" | jq .
        echo ""
        echo "🎯 PORTA $PORT FUNCIONA! Configure SMTP_PORT=$PORT no Railway"
        break
    else
        echo "❌ Falhou na porta $PORT"
        echo "$RESPONSE" | jq .error 2>/dev/null || echo "$RESPONSE"
    fi
    
    # Pequena pausa entre testes
    sleep 2
done

echo ""
echo "🏁 Teste completo!"
echo ""
echo "💡 Se alguma porta funcionou, configure no Railway:"
echo "   Variables → SMTP_PORT=PORTA_QUE_FUNCIONOU"