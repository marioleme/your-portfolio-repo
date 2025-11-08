# 🚀 GUIA DE DEPLOY - GIT + NETLIFY

Este guia completo vai te ajudar a fazer o deploy do seu portfólio no Netlify via GitHub.

---

## 📋 **PRÉ-REQUISITOS**

- [x] Node.js instalado
- [x] Git instalado
- [ ] Conta no GitHub (criar em https://github.com)
- [ ] Conta no Netlify (criar em https://netlify.com)

---

## 🔐 **PASSO 1: PREPARAR O REPOSITÓRIO**

### 1.1 Verificar o arquivo `.env`

**IMPORTANTE:** O arquivo `.env` NÃO deve ser commitado!

Verifique se está no `.gitignore`:
```bash
cat .gitignore
# Deve conter: .env
```

✅ Já está configurado corretamente!

### 1.2 Verificar o `.env.example`

Este arquivo SIM deve ser commitado (sem dados sensíveis):
```bash
cat .env.example
# Deve ter apenas placeholders
```

✅ Já está configurado!

---

## 📦 **PASSO 2: COMMIT NO GIT**

### 2.1 Verificar status do Git

```bash
git status
```

### 2.2 Adicionar todos os arquivos

```bash
git add .
```

### 2.3 Fazer commit

```bash
git commit -m "feat: implementar melhorias de performance, SEO e funcionalidades

- Adicionar lazy loading de componentes
- Implementar scroll progress bar
- Adicionar botão back to top
- Melhorar SEO com meta tags Open Graph
- Adicionar toast notifications
- Implementar envio de email via EmailJS
- Melhorar acessibilidade com skip navigation
- Adicionar modo de teste local para emails"
```

---

## 🌐 **PASSO 3: SUBIR PARA O GITHUB**

### Opção A: Repositório já existe

```bash
git push origin main
```

### Opção B: Primeiro push (repositório novo)

#### 3.1 Criar repositório no GitHub
1. Acesse: https://github.com/new
2. Nome: `portfolio` (ou outro nome)
3. **NÃO** marque "Initialize with README"
4. Clique em "Create repository"

#### 3.2 Conectar e fazer push
```bash
# Verificar se já tem remote
git remote -v

# Se não tiver, adicionar
git remote add origin https://github.com/marioleme/portfolio.git

# Verificar a branch
git branch -M main

# Fazer o primeiro push
git push -u origin main
```

---

## 🎯 **PASSO 4: DEPLOY NO NETLIFY**

### 4.1 Fazer Login no Netlify
1. Acesse: https://app.netlify.com
2. Faça login com GitHub (recomendado)
3. Autorize o Netlify a acessar seus repositórios

### 4.2 Importar Projeto do GitHub
1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Autorize o Netlify (se pedido)
4. Selecione o repositório: `marioleme/portfolio`

### 4.3 Configurar Build Settings

**Build command:**
```bash
npm run build
```

**Publish directory:**
```bash
dist
```

**Build settings detectadas automaticamente!** ✅

### 4.4 Adicionar Variáveis de Ambiente

**IMPORTANTE:** Configure suas credenciais do EmailJS

1. Na página de configuração do site, vá em **"Site settings"**
2. Clique em **"Environment variables"** (no menu lateral)
3. Clique em **"Add a variable"**
4. Adicione cada variável:

```
Key: VITE_EMAILJS_SERVICE_ID
Value: service_9fijzd8

Key: VITE_EMAILJS_TEMPLATE_ID
Value: template_yba5sos

Key: VITE_EMAILJS_PUBLIC_KEY
Value: fKUQLajKFU4q-Ja8G

Key: VITE_EMAIL_TEST_MODE
Value: false
```

**Copie suas credenciais do arquivo `.env` local!**

### 4.5 Deploy!

1. Clique em **"Deploy site"**
2. Aguarde o build (~1-2 minutos)
3. Seu site estará no ar! 🎉

---

## 🌍 **PASSO 5: CONFIGURAR DOMÍNIO CUSTOMIZADO (Opcional)**

### Opção A: Usar domínio Netlify (Grátis)
1. Vá em **"Site settings"** → **"Domain management"**
2. Clique em **"Options"** → **"Edit site name"**
3. Escolha um nome: `mario-oliveira-portfolio.netlify.app`
4. Salve

### Opção B: Usar domínio próprio
1. Compre um domínio (ex: namecheap.com, registro.br)
2. No Netlify: **"Site settings"** → **"Domain management"**
3. Clique em **"Add custom domain"**
4. Digite seu domínio: `marioliveira.dev`
5. Siga as instruções para configurar DNS

---

## 🔄 **DEPLOYS AUTOMÁTICOS**

### Como funciona:
1. Você faz alterações no código local
2. Commit: `git commit -m "feat: nova feature"`
3. Push: `git push origin main`
4. **Netlify detecta e faz deploy automático!** 🚀

### Ver logs de deploy:
1. Acesse o dashboard do Netlify
2. Clique em **"Deploys"**
3. Veja o log detalhado de cada deploy

---

## 📊 **VERIFICAR SE ESTÁ FUNCIONANDO**

### Checklist pós-deploy:

#### Interface:
- [ ] Site carrega corretamente
- [ ] Todas as seções aparecem (Hero, Projects, Skills, About, Contact)
- [ ] Imagens carregam
- [ ] Animações funcionam
- [ ] Tema dark/light funciona

#### Funcionalidades:
- [ ] Scroll progress bar aparece
- [ ] Botão back to top funciona
- [ ] Links para projetos funcionam
- [ ] Links do GitHub abrem
- [ ] Links do LinkedIn abrem

#### Formulário de Contato:
- [ ] **IMPORTANTE:** Testar envio de email
- [ ] Preencher formulário
- [ ] Clicar em enviar
- [ ] Ver toast de sucesso
- [ ] **Verificar email na caixa de entrada** 📧

#### SEO e Performance:
- [ ] Título da página aparece correto
- [ ] Meta description está ok
- [ ] Favicon carrega
- [ ] Rodar Lighthouse (90+ em performance)

---

## 🐛 **TROUBLESHOOTING**

### ❌ Build falha no Netlify

**Erro comum:** `Module not found`

**Solução:**
```bash
# No terminal local
npm install
npm run build
# Se funcionar local, commit e push novamente
```

---

### ❌ Variáveis de ambiente não funcionam

**Sintomas:** Formulário não envia email

**Solução:**
1. Verifique se adicionou as variáveis no Netlify
2. Certifique-se que começam com `VITE_`
3. Faça um novo deploy: **"Trigger deploy"** → **"Clear cache and deploy site"**

---

### ❌ Página 404 ao acessar

**Causa:** Configuração de rotas

**Solução:**
Criar arquivo `netlify.toml` na raiz:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### ❌ Imagens não carregam

**Causa:** Caminho incorreto

**Solução:**
1. Imagens devem estar em `public/`
2. Referenciar sem `/public/`: `/assets/images/logo.png`
3. Ou usar imports no JavaScript

---

## 📈 **MONITORAMENTO PÓS-DEPLOY**

### Netlify Analytics (Pago)
- Visualizações de página
- Bandwidth usado
- Formulários enviados

### Google Analytics (Grátis)
Adicione no `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🎨 **OTIMIZAÇÕES PÓS-DEPLOY**

### 1. Adicionar og-image.jpg
1. Crie uma imagem 1200x630px com preview do seu portfolio
2. Salve em `public/og-image.jpg`
3. Atualize `index.html`:
```html
<meta property="og:image" content="https://seu-site.netlify.app/og-image.jpg" />
```

### 2. Criar favicon personalizado
1. Use: https://favicon.io/
2. Gere o favicon
3. Substitua em `public/`
4. Atualize `index.html`

### 3. Configurar HTTPS
- ✅ Netlify já fornece HTTPS automático!
- Certificado SSL grátis via Let's Encrypt

### 4. Habilitar Asset Optimization
1. **"Site settings"** → **"Build & deploy"**
2. **"Post processing"**
3. Habilite:
   - Bundle CSS
   - Minify CSS
   - Minify JS
   - Compress images

---

## 📱 **TESTE EM DISPOSITIVOS**

### Desktop:
- [ ] Chrome
- [ ] Firefox
- [ ] Edge
- [ ] Safari (Mac)

### Mobile:
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

### Ferramentas de teste:
- Chrome DevTools (Device Mode)
- https://www.browserstack.com/ (pago)
- https://responsively.app/ (grátis)

---

## 🎯 **COMANDOS ÚTEIS - RESUMO**

### Desenvolvimento Local:
```bash
npm run dev         # Iniciar servidor dev
npm run build       # Build para produção
npm run preview     # Preview da build
```

### Git:
```bash
git status          # Ver arquivos modificados
git add .           # Adicionar todos
git commit -m "mensagem"  # Commit
git push            # Enviar para GitHub
git pull            # Baixar do GitHub
```

### Netlify CLI (Opcional):
```bash
npm install -g netlify-cli
netlify login       # Login
netlify deploy      # Deploy preview
netlify deploy --prod  # Deploy produção
```

---

## 📞 **RECURSOS ÚTEIS**

### Documentação:
- Netlify: https://docs.netlify.com
- Vite: https://vitejs.dev
- React: https://react.dev

### Suporte:
- Netlify Community: https://answers.netlify.com
- GitHub Discussions: No seu repositório
- Stack Overflow: Tag `netlify` ou `vite`

---

## 🎉 **CHECKLIST FINAL**

Antes de compartilhar seu portfolio:

- [ ] Site no ar e funcionando
- [ ] Formulário de contato testado e funcionando
- [ ] Todas as imagens carregando
- [ ] Links do GitHub e LinkedIn corretos
- [ ] Lighthouse score 90+ (Performance)
- [ ] Testado em mobile
- [ ] Meta tags Open Graph configuradas
- [ ] Favicon personalizado
- [ ] Domínio customizado (opcional)
- [ ] Google Analytics configurado (opcional)

---

## 🚀 **ESTÁ PRONTO!**

Seu portfolio está no ar! Agora você pode:

1. ✅ Compartilhar nas redes sociais
2. ✅ Adicionar no currículo
3. ✅ Incluir no LinkedIn
4. ✅ Enviar para recrutadores
5. ✅ Continuar melhorando

**URL do seu site:**
```
https://seu-nome.netlify.app
```

ou

```
https://seu-dominio.com
```

---

**Parabéns! Seu portfolio está online! 🎊🎉**

Qualquer dúvida, consulte este guia ou a documentação do Netlify.
