# 🚀 COMANDOS RÁPIDOS PARA DEPLOY

Copie e cole estes comandos no PowerShell para fazer o deploy rapidamente!

---

## ✅ **PREPARAÇÃO (Execute uma vez)**

```powershell
# 1. Verificar se está no diretório correto
cd c:\Users\ma120\Documents\VER\novoVScode

# 2. Verificar Git
git --version

# Se não tiver Git instalado, baixe: https://git-scm.com/download/win
```

---

## 📦 **PASSO 1: COMMIT LOCAL**

```powershell
# Ver arquivos modificados
git status

# Adicionar todos os arquivos
git add .

# Fazer commit com mensagem descritiva
git commit -m "feat: implementar melhorias de performance, SEO e funcionalidades

- Adicionar lazy loading de componentes
- Implementar scroll progress bar e back to top button
- Melhorar SEO com meta tags Open Graph
- Adicionar toast notifications
- Implementar envio de email via EmailJS
- Melhorar acessibilidade com skip navigation
- Adicionar modo de teste local para emails"
```

---

## 🌐 **PASSO 2: PUSH PARA GITHUB**

### Se o repositório JÁ EXISTE:

```powershell
# Push simples
git push origin main
```

### Se é o PRIMEIRO push (repositório novo):

```powershell
# Verificar remote
git remote -v

# Se não tiver remote, adicionar (SUBSTITUA pelo seu repo)
git remote add origin https://github.com/marioleme/your-portfolio-repo.git

# Verificar branch
git branch -M main

# Primeiro push
git push -u origin main
```

---

## 🎯 **PASSO 3: NETLIFY (Primeira vez)**

### Opção A: Via Interface Web (Mais Fácil)

1. Acesse: **https://app.netlify.com**
2. Faça login com GitHub
3. Clique em: **"Add new site"** → **"Import an existing project"**
4. Escolha: **"Deploy with GitHub"**
5. Selecione o repositório: `marioleme/your-portfolio-repo`
6. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. **ANTES de clicar em Deploy**, adicione as variáveis de ambiente:
   - Clique em **"Advanced"** → **"New variable"**
   - Adicione:
     ```
     VITE_EMAILJS_SERVICE_ID = service_9fijzd8
     VITE_EMAILJS_TEMPLATE_ID = template_yba5sos
     VITE_EMAILJS_PUBLIC_KEY = fKUQLajKFU4q-Ja8G
     VITE_EMAIL_TEST_MODE = false
     ```
8. Clique em: **"Deploy site"**
9. Aguarde 1-2 minutos
10. **SEU SITE ESTÁ NO AR!** 🎉

### Opção B: Via CLI Netlify

```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Fazer login
netlify login

# Inicializar projeto
netlify init

# Deploy
netlify deploy --prod
```

---

## 🔄 **DEPLOYS FUTUROS (Automático)**

Depois da primeira configuração, é AUTOMÁTICO:

```powershell
# 1. Fazer alterações no código
# 2. Commit
git add .
git commit -m "feat: adicionar nova funcionalidade"

# 3. Push
git push origin main

# 4. PRONTO! Netlify faz deploy automático 🚀
```

---

## 📊 **VERIFICAR DEPLOY**

```powershell
# Ver status do último deploy
netlify status

# Abrir site no navegador
netlify open:site

# Ver logs
netlify logs
```

---

## 🔧 **COMANDOS ÚTEIS DO GIT**

```powershell
# Ver histórico de commits
git log --oneline

# Ver diferenças não commitadas
git diff

# Desfazer último commit (mantém alterações)
git reset --soft HEAD~1

# Ver branches
git branch

# Criar nova branch
git checkout -b nome-da-branch

# Voltar para main
git checkout main
```

---

## 🐛 **COMANDOS DE EMERGÊNCIA**

### Se algo deu errado:

```powershell
# Reverter todas as alterações não commitadas
git restore .

# Limpar arquivos não rastreados
git clean -fd

# Baixar última versão do GitHub
git pull origin main

# Forçar push (CUIDADO! Sobrescreve remote)
git push --force origin main
```

---

## ✅ **CHECKLIST RÁPIDO**

Antes de fazer deploy:

```powershell
# 1. Testar build local
npm run build

# 2. Preview da build
npm run preview

# 3. Testar formulário de contato

# 4. Verificar .gitignore (não commitar .env)
cat .gitignore

# 5. Fazer commit
git add .
git commit -m "sua mensagem"

# 6. Push
git push origin main

# 7. Verificar deploy no Netlify
# https://app.netlify.com
```

---

## 🎯 **SEQUÊNCIA COMPLETA (Copy & Paste)**

```powershell
# BLOCO 1: Preparar
cd c:\Users\ma120\Documents\VER\novoVScode
npm run build

# BLOCO 2: Commit
git add .
git commit -m "feat: deploy inicial com todas as melhorias"

# BLOCO 3: Push
git push origin main

# BLOCO 4: Verificar
# Acesse: https://app.netlify.com/sites/SEU-SITE/deploys
```

---

## 📞 **SUPORTE RÁPIDO**

### Erro de autenticação Git?
```powershell
# Configurar Git
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ou usar GitHub CLI
gh auth login
```

### Build falhou no Netlify?
1. Verifique os logs no dashboard
2. Teste local: `npm run build`
3. Se funcionar local, clear cache: **"Trigger deploy"** → **"Clear cache and deploy site"**

### Variáveis de ambiente não funcionam?
1. Certifique-se que começam com `VITE_`
2. Reinicie o deploy
3. Verifique se estão no painel do Netlify

---

## 🎉 **PRÓXIMOS PASSOS**

Depois do deploy:

```powershell
# 1. Personalizar domínio (Netlify dashboard)
# 2. Adicionar Google Analytics
# 3. Testar em diferentes dispositivos
# 4. Compartilhar nas redes sociais!
```

---

**Seu portfolio estará no ar em ~5 minutos! 🚀**

URL: `https://seu-site-unico.netlify.app`
