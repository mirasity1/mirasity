# 📊 Google Analytics - Eventos Rastreados

Este documento lista todos os eventos que estão sendo rastreados automaticamente no Google Analytics.

## 🎯 Eventos de CV (Downloads)

### Evento: `file_download`
- **Categoria**: `CV`
- **Local**: About.js, Contact.js
- **Triggers**: Clique no botão "Download CV"
- **Dados coletados**:
  - Idioma do CV (PT/EN)
  - URL do CV
  - Local onde foi clicado (About/Contact)

## 📝 Eventos de Formulário

### Evento: `form_submit`
- **Categoria**: `Form`
- **Local**: Contact.js
- **Triggers**: 
  - Tentativa de envio (`attempt`)
  - Erro de validação (`validation_error`)
  - Envio com sucesso (`success`)
  - Erro no envio (`error`)
- **Dados coletados**:
  - Tipo de formulário (contact)
  - Status do envio
  - Detalhes do erro (se aplicável)

## 🚀 Eventos de Navegação

### Evento: `navigate`
- **Categoria**: `Navigation`
- **Local**: Navigation.js
- **Triggers**: Clique nos links do menu
- **Dados coletados**:
  - Seção de destino (hero, about, skills, etc.)
  - Método de navegação (menu)

### Evento: `language_change`
- **Categoria**: `Localization`
- **Local**: LanguageToggle.js
- **Triggers**: Mudança de idioma
- **Dados coletados**:
  - Idioma anterior
  - Novo idioma

## 📁 Eventos de Projetos

### Evento: `project_interaction`
- **Categoria**: `Project`
- **Local**: Projects.js
- **Triggers**: 
  - Abertura da galeria (`gallery_open`)
  - Fechamento da galeria (`gallery_close`)
  - Clique em detalhes (`details_click`)
  - Clique no botão ver detalhes (`view_details_button`)
- **Dados coletados**:
  - Nome do projeto
  - Tipo de ação

## 🔗 Eventos de Links Externos

### Evento: `click`
- **Categoria**: `External Link`
- **Local**: Contact.js, Projects.js
- **Triggers**: Clique em links externos
- **Dados coletados**:
  - URL de destino
  - Texto do link
  - Seção onde foi clicado
  - Plataforma (LinkedIn, GitHub, etc.)

## 🔘 Eventos de Botões

### Evento: `click`
- **Categoria**: `Button`
- **Local**: Contact.js, About.js
- **Triggers**: Clique em botões importantes
- **Dados coletados**:
  - Nome do botão
  - Seção onde está localizado
  - Dados adicionais específicos

## 📧 Eventos de Contato

### Evento: `click`
- **Categoria**: `Button`
- **Local**: Contact.js
- **Triggers**: Clique no email de contato
- **Dados coletados**:
  - Email de destino

## 📊 Como Visualizar no Google Analytics

1. **Acesse Google Analytics 4**
2. **Vá para Reports > Engagement > Events**
3. **Os principais eventos a acompanhar**:
   - `file_download` - Downloads de CV
   - `form_submit` - Envios de formulário
   - `click` - Cliques em links e botões
   - `navigate` - Navegação pelo site
   - `project_interaction` - Interações com projetos
   - `language_change` - Mudanças de idioma

## 🎨 Eventos Personalizados Importantes

### Para acompanhar conversões:
- **CV Downloads**: `file_download` com `event_category: 'CV'`
- **Formulário de Contato**: `form_submit` com `form_status: 'success'`
- **Links do GitHub**: `click` com `event_label` contendo 'GitHub'
- **Links do LinkedIn**: `click` com `event_label` contendo 'LinkedIn'

### Para análise de comportamento:
- **Tempo nas seções**: Em desenvolvimento
- **Projetos mais visualizados**: `project_interaction`
- **Navegação mais usada**: `navigate`
- **Idioma preferido**: `language_change`

## 🔧 Configuração de Metas no GA4

Recomendações para configurar metas importantes:

1. **Meta: Download de CV**
   - Evento: `file_download`
   - Categoria: `CV`

2. **Meta: Envio de Formulário**
   - Evento: `form_submit`
   - Parâmetro: `form_status = 'success'`

3. **Meta: Visualização de Projetos**
   - Evento: `project_interaction`
   - Parâmetro: `action_type = 'gallery_open'`

4. **Meta: Clique em Links Externos**
   - Evento: `click`
   - Categoria: `External Link`

## 🚀 Próximos Passos

- [ ] Implementar tracking de tempo gasto em seções
- [ ] Adicionar tracking de scroll depth
- [ ] Implementar tracking de cliques em tecnologias/skills
- [ ] Adicionar tracking de visualizações de experiência profissional
- [ ] Implementar tracking de interações com vídeos (quando implementados)

---

**Nota**: Todos os eventos respeitam as preferências de cookies do usuário. O tracking só funciona se o usuário consentir com cookies de analytics.