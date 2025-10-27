#!/bin/bash

echo "🧪 Executando TODOS os testes do projeto Mirasity..."
echo ""

# Função para verificar se um comando teve sucesso
check_success() {
    if [ $? -eq 0 ]; then
        echo "✅ $1 - PASSOU"
        return 0
    else
        echo "❌ $1 - FALHOU"
        return 1
    fi
}

# Contadores
total_tests=0
passed_tests=0

# 1. Testes de Frontend
echo "🎨 === TESTES DE FRONTEND ==="
npm test -- --watchAll=false --coverage=false
check_success "Frontend Unit Tests"
if [ $? -eq 0 ]; then ((passed_tests++)); fi
((total_tests++))

echo ""

# 2. Testes de Backend
echo "🔧 === TESTES DE BACKEND ==="
cd backend
npm test
check_success "Backend Integration Tests" 
if [ $? -eq 0 ]; then ((passed_tests++)); fi
((total_tests++))
cd ..

echo ""

# 3. Verificar e iniciar servidores para E2E
echo "🚀 === VERIFICANDO SERVIDORES PARA E2E ==="

BACKEND_RUNNING=false
FRONTEND_RUNNING=false
BACKEND_PID=""
FRONTEND_PID=""

# Verificar se backend já está rodando
if lsof -i :3001 > /dev/null 2>&1; then
    echo "✅ Backend já está rodando na porta 3001"
    BACKEND_RUNNING=true
else
    echo "🔧 Iniciando backend na porta 3001..."
    cd backend
    npm start &
    BACKEND_PID=$!
    cd ..
    sleep 5
fi

# Verificar se frontend já está rodando
if lsof -i :3000 > /dev/null 2>&1; then
    echo "✅ Frontend já está rodando na porta 3000"
    FRONTEND_RUNNING=true
else
    echo "🎨 Iniciando frontend na porta 3000..."
    npm start &
    FRONTEND_PID=$!
    sleep 3
fi

# Aguardar serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
./scripts/check-servers.sh

if [ $? -eq 0 ]; then
    echo ""
    echo "🧪 === TESTES E2E (CYPRESS) ==="
    
    # Executar testes Cypress (modo normal - rápido)
    npx cypress run --config baseUrl=http://localhost:3000 --env apiUrl=http://localhost:3001,DEMO_MODE=false
    check_success "E2E Tests (Cypress)"
    if [ $? -eq 0 ]; then ((passed_tests++)); fi
    ((total_tests++))
else
    echo "❌ Servidores não ficaram prontos - pulando testes E2E"
    ((total_tests++))
fi

# Limpar apenas processos que iniciamos
echo ""
echo "🧹 Limpando processos iniciados pelo script..."

if [ "$BACKEND_PID" != "" ]; then
    echo "🔧 Parando backend iniciado pelo script (PID: $BACKEND_PID)"
    kill $BACKEND_PID 2>/dev/null
fi

if [ "$FRONTEND_PID" != "" ]; then
    echo "🎨 Parando frontend iniciado pelo script (PID: $FRONTEND_PID)"  
    kill $FRONTEND_PID 2>/dev/null
fi

if [ "$BACKEND_RUNNING" = false ] || [ "$FRONTEND_RUNNING" = false ]; then
    echo "⏳ Aguardando processos terminarem..."
    sleep 3
fi

echo ""
echo "📊 === RESUMO DOS TESTES ==="
echo "✅ Testes que passaram: $passed_tests"
echo "📝 Total de testes: $total_tests"

percentage=$((passed_tests * 100 / total_tests))
echo "📈 Taxa de sucesso: $percentage%"

if [ $passed_tests -eq $total_tests ]; then
    echo ""
    echo "🎉 TODOS OS TESTES PASSARAM! 🎉"
    echo "✨ Projeto pronto para apresentação!"
    exit 0
else
    echo ""
    echo "⚠️  Alguns testes falharam"
    echo "🔧 Verifique os logs acima para detalhes"
    exit 1
fi