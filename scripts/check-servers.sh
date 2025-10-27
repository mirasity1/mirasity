#!/bin/bash

echo "🔍 Verificando conectividade dos servidores..."

# Função para verificar se um serviço está respondendo
check_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1

    echo "🚀 Verificando $name em $url"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" > /dev/null 2>&1; then
            echo "✅ $name está respondendo (tentativa $attempt)"
            return 0
        else
            echo "⏳ Tentativa $attempt/$max_attempts - aguardando $name..."
            sleep 2
            ((attempt++))
        fi
    done
    
    echo "❌ $name não respondeu após $max_attempts tentativas"
    return 1
}

# Verificar backend
echo ""
echo "📡 Verificando Backend API..."
if check_service "http://localhost:3001/health" "Backend API"; then
    echo "✅ Backend está pronto na porta 3001"
else
    echo "❌ Backend não está acessível"
    echo "🔧 Tentando diagnóstico..."
    
    # Verificar se há algo na porta 3001
    if lsof -i :3001 > /dev/null 2>&1; then
        echo "📊 Processo encontrado na porta 3001:"
        lsof -i :3001
    else
        echo "📊 Nenhum processo encontrado na porta 3001"
    fi
    
    exit 1
fi

# Verificar frontend  
echo ""
echo "🌐 Verificando Frontend..."
if check_service "http://localhost:3000" "Frontend"; then
    echo "✅ Frontend está pronto na porta 3000"
else
    echo "❌ Frontend não está acessível"
    echo "🔧 Tentando diagnóstico..."
    
    # Verificar se há algo na porta 3000
    if lsof -i :3000 > /dev/null 2>&1; then
        echo "📊 Processo encontrado na porta 3000:"
        lsof -i :3000
    else
        echo "📊 Nenhum processo encontrado na porta 3000"
    fi
    
    exit 1
fi

echo ""
echo "🎉 Todos os serviços estão funcionando!"
echo "✅ Backend: http://localhost:3001"  
echo "✅ Frontend: http://localhost:3000"
echo "🚀 Pronto para executar testes E2E!"