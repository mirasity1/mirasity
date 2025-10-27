#!/bin/bash

echo "🎭 DEMONSTRAÇÃO INTERATIVA - TESTES CYPRESS"
echo "==========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${PURPLE}🎯 Demonstração interativa com interface visual${NC}"
echo -e "${CYAN}   • Execução com interface gráfica${NC}"
echo -e "${CYAN}   • Possibilidade de pausar e observar${NC}"
echo -e "${CYAN}   • Modo ideal para apresentações ao vivo${NC}"
echo ""

echo -e "${YELLOW}📋 Como funciona:${NC}"
echo "• O Cypress abrirá com interface gráfica"
echo "• Você pode selecionar qual teste executar"
echo "• Os testes rodam em modo de demonstração (mais lentos)"
echo "• Pode pausar/continuar durante a execução"
echo ""

read -p "🚀 Deseja abrir o Cypress em modo interativo? (y/n): " confirm

if [[ $confirm == [yY] || $confirm == [yY][eE][sS] ]]; then
    echo ""
    echo -e "${GREEN}🔧 Iniciando Cypress em modo interativo...${NC}"
    echo -e "${BLUE}💡 Selecione um teste com '-demo' no nome para ver a versão de apresentação${NC}"
    echo ""
    
    # Definir modo demo e abrir Cypress interativo
    CYPRESS_DEMO_MODE=true npx cypress open
else
    echo -e "${YELLOW}👋 Demonstração cancelada.${NC}"
    echo -e "${BLUE}💡 Para executar mais tarde: ./demo-interactive.sh${NC}"
fi