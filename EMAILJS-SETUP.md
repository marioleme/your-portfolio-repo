# 📧 CONFIGURAÇÃO DO EMAILJS - GUIA PASSO A PASSO

Este guia vai te ajudar a configurar o envio de emails reais no formulário de contato do seu portfólio.

## 🚀 Por que EmailJS?

- ✅ **Gratuito**: 200 emails/mês no plano gratuito
- ✅ **Fácil**: Não precisa de backend
- ✅ **Rápido**: Configuração em 5 minutos
- ✅ **Seguro**: Suas credenciais ficam protegidas

---

## 📝 PASSO 1: Criar Conta no EmailJS

1. Acesse: **https://www.emailjs.com/**
2. Clique em **"Sign Up"** (Cadastrar)
3. Use sua conta do Google/GitHub ou email
4. Confirme seu email

---

## ⚙️ PASSO 2: Adicionar Serviço de Email

1. No dashboard, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email:
   - **Gmail** (recomendado)
   - Outlook
   - Yahoo
   - Outros

### Para Gmail:
1. Selecione **"Gmail"**
2. Clique em **"Connect Account"**
3. Faça login com sua conta Google
4. Autorize o EmailJS
5. Dê um nome ao serviço (ex: "Portfolio Gmail")
6. Copie o **Service ID** (algo como `service_xxxxxxx`)
7. Clique em **"Create Service"**

---

## 📧 PASSO 3: Criar Template de Email

1. No dashboard, clique em **"Email Templates"**
2. Clique em **"Create New Template"**
3. Configure o template:

### Configurações do Template:

**Nome do Template:** Portfolio Contact Form

**Subject (Assunto):**
```
Nova mensagem de {{ from_name }} - Portfolio
```

**Content (Conteúdo):**
```
Você recebeu uma nova mensagem através do formulário de contato do seu portfolio!

Nome: {{ from_name }}
Email: {{ from_email }}

Mensagem:
{{ message }}

---
Esta mensagem foi enviada através do formulário de contato do seu portfolio.
```

**To Email:** seu-email@gmail.com (seu email real)

4. Clique em **"Test It"** para testar
5. Clique em **"Save"**
6. Copie o **Template ID** (algo como `template_xxxxxxx`)

---

## 🔑 PASSO 4: Obter Public Key

1. No dashboard, clique no seu nome (canto superior direito)
2. Vá em **"Account"** → **"General"**
3. Copie a **Public Key** (algo como `xxxxxxxxxxxx`)

---

## 💻 PASSO 5: Adicionar Credenciais no Código

Abra o arquivo: `src/services/emailService.js`

Substitua as credenciais:

```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_xxxxxxx',    // Seu Service ID aqui
  templateId: 'template_xxxxxxx',  // Seu Template ID aqui
  publicKey: 'xxxxxxxxxxxx'        // Sua Public Key aqui
};
```

### Exemplo:
```javascript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  publicKey: 'fH8K2p9L3mN5qR7s'
};
```

---

## ✅ PASSO 6: Testar o Formulário

1. Salve o arquivo `emailService.js`
2. O servidor deve recarregar automaticamente
3. Vá até a seção de **Contato** no seu portfolio
4. Preencha o formulário:
   - **Nome:** Seu Nome
   - **Email:** seu-email@test.com
   - **Mensagem:** Teste de envio
5. Clique em **Enviar**
6. Você deve ver uma notificação de sucesso
7. Verifique seu email (pode ir para spam)

---

## 🔒 SEGURANÇA: Usar Variáveis de Ambiente (Recomendado)

Para maior segurança, use variáveis de ambiente:

### 1. Crie um arquivo `.env` na raiz do projeto:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

### 2. Atualize o `emailService.js`:

```javascript
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};
```

### 3. Adicione `.env` ao `.gitignore`:

```
# Environment variables
.env
.env.local
```

### 4. Para produção (Vercel/Netlify):
- Adicione as variáveis de ambiente no painel do provedor
- Não commite o arquivo `.env`

---

## 🎨 PERSONALIZAÇÃO DO TEMPLATE

Você pode personalizar o template com mais campos:

### Adicionar campos no template:
```
Nome: {{ from_name }}
Email: {{ from_email }}
Telefone: {{ phone }}
Empresa: {{ company }}
Mensagem: {{ message }}
```

### Adicionar campos no formulário (Contact.jsx):
```jsx
<input
  {...register('phone', { required: 'Telefone obrigatório' })}
  placeholder="Telefone"
/>
```

---

## 🐛 TROUBLESHOOTING (Problemas Comuns)

### ❌ Erro: "Service ID not found"
- Verifique se copiou o Service ID correto
- Verifique se o serviço está ativo no EmailJS

### ❌ Erro: "Template ID not found"
- Verifique se copiou o Template ID correto
- Verifique se salvou o template

### ❌ Email não chega
- Verifique a pasta de SPAM
- Teste com "Test It" no painel do EmailJS
- Verifique se o serviço do Gmail está conectado

### ❌ Erro: "Public Key is invalid"
- Copie novamente a Public Key
- Certifique-se de não ter espaços extras

### ❌ Console mostra erro de CORS
- EmailJS já configura CORS automaticamente
- Limpe o cache do navegador

---

## 📊 MONITORAMENTO

No dashboard do EmailJS você pode:
- Ver quantos emails foram enviados
- Taxa de sucesso/falha
- Logs detalhados de cada envio
- Limite de emails restantes no mês

---

## 💡 DICAS EXTRAS

1. **Auto-resposta**: Configure um segundo template para responder automaticamente ao usuário
2. **Notificações**: Receba notificações no celular quando alguém enviar mensagem
3. **Múltiplos destinatários**: Configure CC e BCC no template
4. **Templates diferentes**: Crie templates para diferentes propósitos

---

## 🎉 PRONTO!

Agora seu formulário de contato está funcionando e enviando emails reais!

**Recursos úteis:**
- 📚 Documentação: https://www.emailjs.com/docs/
- 💬 Suporte: https://www.emailjs.com/support/
- 🎥 Tutoriais: https://www.youtube.com/c/EmailJS

---

## 📞 PRÓXIMOS PASSOS

1. ✅ Configurar EmailJS
2. ✅ Testar envio de emails
3. ⏳ Adicionar auto-resposta ao usuário
4. ⏳ Configurar webhook para Discord/Slack
5. ⏳ Adicionar Google reCAPTCHA para evitar spam

**Dúvidas?** Consulte a documentação oficial ou me pergunte!
