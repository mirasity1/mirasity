# 🔍 SEO & Analytics Setup

Este documento explica como configurar e gerenciar o SEO e Analytics do portfolio.

## 📊 Google Analytics 4 (GA4)

### Configuração Inicial

1. **Criar uma conta GA4:**
   - Acesse [Google Analytics](https://analytics.google.com/)
   - Crie uma nova propriedade
   - Copie o ID de medição (formato: G-XXXXXXXXXX)

2. **Configurar no projeto:**
   ```bash
   # Adicionar ao arquivo .env
   REACT_APP_GA_TRACKING_ID=G-SEU_ID_AQUI
   ```

3. **Verificar se está funcionando:**
   - Acesse o site
   - Vá ao Google Analytics > Relatórios > Tempo real
   - Deve aparecer sua visita

### Eventos Rastreados

Automaticamente rastreamos:

- **Formulário de Contato:**
  - `form_submit_attempt` - Tentativa de envio
  - `form_submit_success` - Envio com sucesso
  - `form_submit_error` - Erro no envio
  - `form_validation_error` - Erro de validação

- **Projetos:**
  - `project_gallery_open` - Abertura da galeria
  - `project_gallery_close` - Fechamento da galeria
  - `project_live_click` - Clique no link do projeto
  - `project_github_click` - Clique no link do GitHub

- **Navegação:**
  - Page views automáticos
  - Scroll tracking (pode ser adicionado)

### Adicionar Novos Eventos

```javascript
import { trackEvent } from './GoogleAnalytics';

// Exemplo de uso
trackEvent('button_click', 'Navigation', 'Download CV');
trackEvent('section_view', 'Content', 'Skills Section');
```

## 🎯 SEO Optimization

### Meta Tags Implementadas

- **Título dinâmico** por seção
- **Descrições personalizadas** PT/EN
- **Keywords relevantes** para developer
- **Open Graph** (Facebook/LinkedIn)
- **Twitter Cards**
- **Schema.org** structured data

### Estrutura de URLs

```
https://mirasity.pt/           # Página principal
https://mirasity.pt/en         # Versão em inglês
https://mirasity.pt/#about     # Seção sobre
https://mirasity.pt/#projects  # Seção projetos
```

### Sitemap XML

Localizado em `/public/sitemap.xml` com:
- URLs principais
- Frequência de atualização
- Prioridades
- Hreflang para PT/EN

### Robots.txt

Configurado para:
- Permitir todos os crawlers
- Apontar para o sitemap
- Crawl delay otimizado

## 🚀 Melhorias de Performance

### Implementadas

- **Preconnect** para fontes e GA
- **Lazy loading** de imagens
- **Framer Motion** otimizado
- **Bundle splitting** automático

### Próximos Passos

- [ ] Implementar lazy loading nas seções
- [ ] Adicionar Service Worker
- [ ] Otimizar imagens com WebP
- [ ] Implementar Critical CSS

## 📈 Monitoramento

### Google Search Console

1. Acesse [Search Console](https://search.google.com/search-console)
2. Adicione a propriedade (mirasity.pt)
3. Verifique via HTML tag ou DNS
4. Submeta o sitemap

### Page Speed Insights

Monitore regularmente:
- [Desktop](https://pagespeed.web.dev/analysis/https-mirasity-pt/desktop)
- [Mobile](https://pagespeed.web.dev/analysis/https-mirasity-pt/mobile)

### Lighthouse Metrics

Objetivos:
- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >90
- **SEO:** 100

## 🔧 Configurações Avançadas

### Meta Tags Personalizadas por Seção

```javascript
// Exemplo de uso no componente
<SEO 
  title="Sobre Mim"
  description="Full-Stack Developer com experiência em React e Laravel"
  keywords="desenvolvedor, react, laravel, portfolio"
  section="about"
/>
```

### Structured Data (JSON-LD)

Implementado automaticamente:
- Dados pessoais
- Habilidades técnicas
- Experiência profissional
- Informações de contato

### Hreflang

Configurado para:
- Português (pt) - padrão
- Inglês (en) - alternativo
- x-default - fallback

## 📋 Checklist de Deploy

### Antes do Deploy

- [ ] Configurar GA_TRACKING_ID real
- [ ] Adicionar SITE_URL de produção
- [ ] Atualizar sitemap com URLs finais
- [ ] Testar meta tags no Facebook Debugger
- [ ] Validar structured data no Google

### Após o Deploy

- [ ] Verificar GA em tempo real
- [ ] Submeter sitemap no Search Console
- [ ] Testar velocidade no PageSpeed
- [ ] Verificar meta tags no navegador
- [ ] Configurar Google My Business (se aplicável)

### URLs de Teste

- [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

## 🎯 KPIs Recomendados

### Traffic Metrics
- Sessões mensais
- Usuários únicos
- Taxa de rejeição
- Duração da sessão

### Engagement Metrics
- Cliques em projetos
- Downloads de CV
- Envios de formulário
- Visualizações de galeria

### Technical Metrics
- Core Web Vitals
- Page Load Time
- Mobile Performance
- SEO Score

## 📞 Suporte

Para dúvidas sobre SEO ou Analytics:
- Documentação do GA4
- Google Search Central
- Web.dev guides
- Lighthouse documentation