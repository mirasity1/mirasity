# 🎥 Guia para Upload de Vídeos

## Passos para configurar os vídeos:

### 1. **Upload para YouTube**
1. Acesse [YouTube Studio](https://studio.youtube.com)
2. Clique em "CREATE" → "Upload videos"
3. Faça upload dos seus 3 vídeos:
   - `booktrack-demo.mp4`
   - `viagens-demo.mp4` 
   - `badges-demo.mp4`

### 2. **Configurar Vídeos no YouTube**
- **Título**: Nome do projeto
- **Descrição**: Descrição do projeto
- **Privacidade**: "Não listado" (para não aparecer em buscas públicas)
- **Thumbnail**: Use uma imagem representativa do projeto

### 3. **Obter IDs dos Vídeos**
Após upload, a URL será algo como:
```
https://www.youtube.com/watch?v=ABC123DEF456
```
O ID é a parte depois do `v=`: **ABC123DEF456**

### 4. **Atualizar o Código**
No arquivo `src/components/Projects.js`, substitua:

```javascript
video: index === 0 ? { 
  type: 'youtube', 
  id: 'SEU_ID_DO_BOOKTRACK_AQUI',
  thumbnail: '/booktrack-demo-thumb.jpg'
} : 
index === 1 ? { 
  type: 'youtube', 
  id: 'SEU_ID_DO_VIAGENS_AQUI',
  thumbnail: '/viagens-demo-thumb.jpg'
} : 
index === 2 ? { 
  type: 'youtube', 
  id: 'SEU_ID_DO_BADGES_AQUI',
  thumbnail: '/badges-demo-thumb.jpg'
} : null,
```

### 5. **Exemplo Completo**
```javascript
video: index === 0 ? { 
  type: 'youtube', 
  id: 'dQw4w9WgXcQ',  // ← Seu ID real aqui
  thumbnail: null     // ← YouTube vai usar thumbnail automático
} : 
index === 1 ? { 
  type: 'youtube', 
  id: 'ScMzIvxBSi4',  // ← Seu ID real aqui
  thumbnail: null
} : 
index === 2 ? { 
  type: 'youtube', 
  id: 'jNQXAC9IVRw',  // ← Seu ID real aqui
  thumbnail: null
} : null,
```

## ✅ Vantagens desta Solução:

- 🚀 **Performance**: Vídeos carregam mais rápido
- 💰 **Custo**: Hospedagem gratuita
- 📱 **Responsivo**: YouTube otimiza para diferentes dispositivos
- 🎬 **Qualidade**: Múltiplas resoluções automáticas
- 🔧 **Fácil manutenção**: Atualizar vídeos sem redeploy

## 🔄 Alternativas:

### Vimeo (Mais profissional)
1. Upload para [Vimeo](https://vimeo.com)
2. Configurar como "Unlisted"
3. Usar ID do Vimeo no código

### GitHub Large File Storage (LFS)
Para vídeos < 100MB:
1. Configurar Git LFS
2. Hospedar via GitHub Raw
3. Usar URL direta no código

---

**Próximo passo**: Faça upload dos 3 vídeos para YouTube e me envie os IDs para eu atualizar o código!