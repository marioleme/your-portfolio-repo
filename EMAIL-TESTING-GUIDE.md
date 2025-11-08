# 🧪 GUIA DE TESTE LOCAL - FORMULÁRIO DE EMAIL

Este guia mostra como testar o formulário de contato localmente, com e sem enviar emails reais.

---

## 🎯 **2 MODOS DE TESTE**

### 1️⃣ **MODO DE TESTE (Desenvolvimento)** 🧪
- ✅ **NÃO envia email real**
- ✅ Mostra dados do formulário no console
- ✅ Simula delay de envio
- ✅ Perfeito para desenvolvimento
- ✅ Não gasta quota do EmailJS

### 2️⃣ **MODO REAL (Produção)** 📧
- ✅ **Envia email real via EmailJS**
- ✅ Requer credenciais configuradas
- ✅ Usa quota do EmailJS (200/mês grátis)
- ✅ Perfeito para testar envio real

---

## 🚀 **COMO USAR - PASSO A PASSO**

### **OPÇÃO A: Testar SEM enviar email real** (Recomendado para desenvolvimento)

#### Passo 1: Configure o modo de teste no `.env`
```env
VITE_EMAIL_TEST_MODE=true
```

#### Passo 2: Reinicie o servidor
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

#### Passo 3: Teste o formulário
1. Acesse: http://localhost:3001 (ou sua porta)
2. Role até a seção **Contato**
3. Preencha o formulário:
   - **Nome:** Teste Local
   - **Email:** teste@example.com
   - **Mensagem:** Testando formulário em modo local
4. Clique em **Enviar**
5. Abra o **DevTools Console** (F12)
6. Veja os dados do formulário no console:

```
🧪 MODO DE TESTE - Email não será enviado
📧 Dados do formulário: {name: "Teste Local", email: "teste@example.com", message: "Testando..."}
-----------------------------------
De: Teste Local <teste@example.com>
Mensagem: Testando formulário em modo local
-----------------------------------
```

#### Passo 4: Verifique o toast de sucesso
- Você verá a notificação: "Email testado com sucesso! (Modo de teste)"

---

### **OPÇÃO B: Testar COM envio real de email** (Produção)

#### Passo 1: Configure o modo real no `.env`
```env
VITE_EMAIL_TEST_MODE=false
```

#### Passo 2: Verifique as credenciais no `.env`
```env
VITE_EMAILJS_SERVICE_ID=service_9fijzd8
VITE_EMAILJS_TEMPLATE_ID=template_yba5sos
VITE_EMAILJS_PUBLIC_KEY=fKUQLajKFU4q-Ja8G
```

✅ **Você já tem as credenciais configuradas!**

#### Passo 3: Reinicie o servidor
```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

#### Passo 4: Teste o formulário
1. Acesse: http://localhost:3001
2. Role até **Contato**
3. Preencha com **dados reais**:
   - **Nome:** Seu Nome
   - **Email:** seu-email@gmail.com
   - **Mensagem:** Teste de envio real
4. Clique em **Enviar**
5. Aguarde ~2 segundos
6. Verifique no console: `✅ Email enviado com sucesso!`

#### Passo 5: Verifique seu email
- Acesse seu email configurado no EmailJS
- Procure na **Caixa de Entrada**
- Se não encontrar, verifique o **SPAM**
- Você deve receber o email com os dados do formulário

---

## 📊 **COMPARAÇÃO DOS MODOS**

| Aspecto | Modo Teste | Modo Real |
|---------|------------|-----------|
| Envia email | ❌ Não | ✅ Sim |
| Mostra no console | ✅ Sim | ✅ Sim |
| Requer credenciais | ❌ Não | ✅ Sim |
| Usa quota EmailJS | ❌ Não | ✅ Sim (200/mês) |
| Toast notification | ✅ Sim | ✅ Sim |
| Validação formulário | ✅ Sim | ✅ Sim |
| Delay de envio | ✅ 1.5s | ⏱️ Real (~2s) |

---

## 🔍 **VERIFICANDO NO CONSOLE**

### Modo de Teste:
```javascript
🧪 MODO DE TESTE - Email não será enviado
📧 Dados do formulário: {
  name: "Teste",
  email: "teste@email.com", 
  message: "Mensagem de teste"
}
```

### Modo Real (Sucesso):
```javascript
✅ Email enviado com sucesso! {
  status: 200,
  text: "OK"
}
```

### Modo Real (Erro):
```javascript
❌ Erro ao enviar email: {
  text: "The public key is invalid"
}
```

---

## 🐛 **TROUBLESHOOTING**

### ❌ "EmailJS não configurado"
**Causa:** Credenciais vazias ou inválidas no `.env`

**Solução:**
1. Verifique o arquivo `.env`
2. Confirme que as variáveis estão preenchidas
3. Reinicie o servidor

---

### ❌ "The public key is invalid"
**Causa:** Public Key incorreta

**Solução:**
1. Acesse https://dashboard.emailjs.com/admin
2. Vá em Account → General
3. Copie a Public Key correta
4. Atualize no `.env`
5. Reinicie o servidor

---

### ❌ "Template not found"
**Causa:** Template ID incorreto

**Solução:**
1. Acesse https://dashboard.emailjs.com/admin/templates
2. Verifique o Template ID
3. Atualize no `.env`
4. Reinicie o servidor

---

### ❌ Email não chega
**Possíveis causas:**
1. **SPAM** - Verifique a pasta de spam
2. **Email errado** - Verifique o template no EmailJS
3. **Quota excedida** - Verifique no dashboard (200/mês grátis)
4. **Serviço desconectado** - Reconecte o Gmail no EmailJS

**Como verificar:**
1. Acesse: https://dashboard.emailjs.com/admin
2. Vá em "History" ou "Logs"
3. Veja se o email aparece como enviado
4. Se aparece como enviado mas não chegou → verifique SPAM

---

### ❌ Console mostra erro de CORS
**Causa:** Problema raro com cache

**Solução:**
1. Limpe o cache do navegador
2. Abra em aba anônima
3. Reinicie o servidor

---

## 💡 **DICAS IMPORTANTES**

### 1. Durante o Desenvolvimento:
```env
VITE_EMAIL_TEST_MODE=true  # ← Use modo de teste
```
✅ Evita gastar quota do EmailJS  
✅ Testa mais rápido  
✅ Não precisa verificar email  

### 2. Antes de Fazer Deploy:
```env
VITE_EMAIL_TEST_MODE=false  # ← Use modo real
```
✅ Testa envio real  
✅ Verifica se email chega  
✅ Valida template  

### 3. Em Produção (Vercel/Netlify):
- Configure as variáveis de ambiente no painel
- **NÃO** commite o arquivo `.env`
- Use `VITE_EMAIL_TEST_MODE=false`

---

## 📝 **CHECKLIST DE TESTE**

### Teste em Modo de Desenvolvimento:
- [ ] Alterar `.env`: `VITE_EMAIL_TEST_MODE=true`
- [ ] Reiniciar servidor
- [ ] Preencher formulário
- [ ] Verificar console (dados aparecem?)
- [ ] Ver toast de sucesso
- [ ] Confirmar que email NÃO foi enviado

### Teste em Modo Real:
- [ ] Alterar `.env`: `VITE_EMAIL_TEST_MODE=false`
- [ ] Verificar credenciais EmailJS
- [ ] Reiniciar servidor
- [ ] Preencher formulário com dados reais
- [ ] Verificar console (sucesso?)
- [ ] Ver toast de sucesso
- [ ] **Verificar email recebido**
- [ ] Verificar pasta SPAM
- [ ] Confirmar dados corretos no email

---

## 🎯 **WORKFLOW RECOMENDADO**

### Durante Desenvolvimento:
```
1. VITE_EMAIL_TEST_MODE=true
2. Desenvolver e testar formulário
3. Verificar validações
4. Testar erros e casos extremos
```

### Antes de Commitar:
```
1. VITE_EMAIL_TEST_MODE=false
2. Testar envio real
3. Verificar email chegou
4. Voltar para true
5. Commitar código
```

### Em Produção:
```
1. Configurar variáveis no Vercel/Netlify
2. VITE_EMAIL_TEST_MODE=false
3. Testar em staging
4. Deploy para produção
```

---

## 📊 **MONITORAMENTO**

### No Dashboard do EmailJS:
1. Acesse: https://dashboard.emailjs.com/admin
2. Veja:
   - **History**: Últimos emails enviados
   - **Stats**: Estatísticas de envio
   - **Quota**: Emails restantes no mês (200 grátis)

### No Console do Navegador:
- Modo Teste: 🧪 ícone e mensagem clara
- Modo Real: ✅ ou ❌ com detalhes
- Sempre mostra os dados enviados

---

## 🎉 **PRONTO PARA TESTAR!**

**Recomendação:**
1. Comece com `VITE_EMAIL_TEST_MODE=true` para explorar
2. Quando estiver confortável, mude para `false` e teste real
3. Volte para `true` durante desenvolvimento
4. Use `false` apenas para testes finais e produção

**Lembre-se:**
- ✅ Modo teste = Desenvolvimento rápido
- ✅ Modo real = Validação final
- ✅ 200 emails/mês grátis no EmailJS

---

**Dúvidas?** Verifique o console do navegador, ele sempre mostra o que está acontecendo! 🔍
