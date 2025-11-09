# 📧 GUIA DE VARIÁVEIS DO EMAIL - TEMPLATE EMAILJS

Este guia mostra como as variáveis do seu código se conectam com o template do EmailJS.

---

## 🔗 **CONEXÃO: Código ↔️ Template EmailJS**

### **No seu código (`emailService.js`):**

```javascript
const templateParams = {
  from_name: formData.name,        // ← Do formulário
  from_email: formData.email,      // ← Do formulário
  message: formData.message,       // ← Do formulário
  to_name: 'Mario Oliveira',       // ← Seu nome (fixo)
  reply_to: formData.email         // ← Email para resposta
};
```

### **No Template do EmailJS:**

Use essas variáveis entre **chaves duplas** `{{ variavel }}`:

```
{{ from_name }}      → Nome de quem enviou
{{ from_email }}     → Email de quem enviou
{{ message }}        → Mensagem do formulário
{{ to_name }}        → Seu nome (destinatário)
{{ reply_to }}       → Email para responder
```

---

## 📝 **TEMPLATE COMPLETO RECOMENDADO**

### **1. SUBJECT (Assunto do Email):**

```
Nova mensagem de {{ from_name }} - Portfolio
```

**Resultado:** "Nova mensagem de João Silva - Portfolio"

---

### **2. CONTENT (Corpo do Email):**

```html
Olá {{ to_name }},

Você recebeu uma nova mensagem através do formulário de contato do seu portfolio!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 NOME: {{ from_name }}
📧 EMAIL: {{ from_email }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 MENSAGEM:

{{ message }}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para responder, clique em "Reply" ou envie para: {{ reply_to }}

---
Esta mensagem foi enviada através do formulário de contato do seu portfolio.
Data: {{ date }}
```

---

## 🎨 **TEMPLATE COM FORMATAÇÃO HTML (Recomendado)**

Para um email mais bonito, use HTML no template:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: white;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .info-box {
            background: #f0f4ff;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
        }
        .message-box {
            background: #fff;
            border: 1px solid #e0e0e0;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .footer {
            text-align: center;
            color: #999;
            font-size: 12px;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 Nova Mensagem do Portfolio</h1>
        </div>
        
        <div class="content">
            <p>Olá <strong>{{ to_name }}</strong>,</p>
            
            <p>Você recebeu uma nova mensagem através do seu formulário de contato!</p>
            
            <div class="info-box">
                <p><strong>👤 Nome:</strong> {{ from_name }}</p>
                <p><strong>📧 Email:</strong> {{ from_email }}</p>
            </div>
            
            <div class="message-box">
                <h3>💬 Mensagem:</h3>
                <p>{{ message }}</p>
            </div>
            
            <p>Para responder, clique no botão abaixo ou responda diretamente este email:</p>
            
            <a href="mailto:{{ reply_to }}" class="button">Responder Email</a>
            
            <div class="footer">
                <p>Esta mensagem foi enviada através do formulário de contato do seu portfolio.</p>
                <p>© 2025 Portfolio Mario Oliveira</p>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 **COMO CONFIGURAR NO EMAILJS**

### **PASSO A PASSO:**

1. **Acesse:** https://dashboard.emailjs.com/admin/templates

2. **Clique no seu template** (ou crie um novo)

3. **Subject (Assunto):**
   ```
   Nova mensagem de {{ from_name }} - Portfolio
   ```

4. **Content (Conteúdo):**
   - Cole um dos templates acima (texto simples OU HTML)
   - Escolha HTML para visual melhor

5. **Settings (Configurações):**
   - **From Name:** Seu nome ou "Portfolio Contact Form"
   - **From Email:** O email que você configurou no Service
   - **Reply To:** `{{ reply_to }}` ← **IMPORTANTE!**
   - **To Email:** Seu email (onde quer receber)

6. **Test It:**
   - Clique em "Test It" para ver como fica
   - Preencha os campos de teste
   - Envie e verifique seu email

7. **Save**

---

## 📋 **VARIÁVEIS DISPONÍVEIS**

### **Variáveis que você ENVIA do código:**

| Variável | Origem | Descrição |
|----------|--------|-----------|
| `{{ from_name }}` | `formData.name` | Nome de quem enviou |
| `{{ from_email }}` | `formData.email` | Email de quem enviou |
| `{{ message }}` | `formData.message` | Mensagem do formulário |
| `{{ to_name }}` | Fixo no código | Seu nome (destinatário) |
| `{{ reply_to }}` | `formData.email` | Email para resposta |

### **Variáveis AUTOMÁTICAS do EmailJS:**

| Variável | Descrição |
|----------|-----------|
| `{{ date }}` | Data/hora do envio |
| `{{ user_agent }}` | Navegador do usuário |
| `{{ user_ip }}` | IP do usuário |

---

## ➕ **ADICIONAR MAIS VARIÁVEIS**

### **1. Adicionar no formulário (Contact.jsx):**

Exemplo: adicionar campo "telefone"

```jsx
<input
  {...register('phone', { required: 'Telefone obrigatório' })}
  placeholder="Telefone"
  type="tel"
/>
```

### **2. Adicionar no código (emailService.js):**

```javascript
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  message: formData.message,
  phone: formData.phone,        // ← NOVO
  to_name: 'Mario Oliveira',
  reply_to: formData.email
};
```

### **3. Usar no template do EmailJS:**

```
👤 Nome: {{ from_name }}
📧 Email: {{ from_email }}
📱 Telefone: {{ phone }}        ← NOVO

💬 Mensagem:
{{ message }}
```

---

## 💡 **EXEMPLOS DE ASSUNTOS (Subject)**

### **Simples:**
```
Nova mensagem - Portfolio
```

### **Com nome:**
```
Mensagem de {{ from_name }}
```

### **Com email:**
```
{{ from_name }} ({{ from_email }}) te enviou uma mensagem
```

### **Mais formal:**
```
[PORTFOLIO] Contato de {{ from_name }}
```

### **Com data:**
```
Nova mensagem - {{ date }}
```

---

## 🎯 **TEMPLATE MINIMALISTA (Texto Simples)**

Se preferir email simples sem HTML:

```
Olá Mario,

Nova mensagem do formulário de contato!

Nome: {{ from_name }}
Email: {{ from_email }}

Mensagem:
{{ message }}

---
Responder para: {{ reply_to }}
```

---

## 🔍 **TESTAR VARIÁVEIS**

### **No EmailJS Dashboard:**

1. Abra seu template
2. Clique em **"Test It"**
3. Preencha os campos de teste:
   ```
   from_name: João Silva
   from_email: joao@teste.com
   message: Olá, gostaria de um orçamento
   to_name: Mario Oliveira
   reply_to: joao@teste.com
   ```
4. Clique em **"Send Test Email"**
5. Verifique seu email!

### **No seu site local:**

1. Rode o projeto: `npm run dev`
2. Vá até a seção Contato
3. Preencha o formulário
4. Envie
5. Verifique seu email!

---

## 🐛 **PROBLEMAS COMUNS**

### ❌ Variável aparece como `{{ from_name }}` no email

**Causa:** Nome da variável errado ou não enviada

**Solução:**
1. Verifique se o nome no código é **exatamente igual** ao template
2. Verifique se está usando **chaves duplas** `{{ }}`
3. Verifique no console se a variável está sendo enviada

---

### ❌ Email chega vazio

**Causa:** Variáveis não mapeadas

**Solução:**
1. Abra `emailService.js`
2. Verifique o objeto `templateParams`
3. Certifique-se que todos os campos estão sendo enviados

---

### ❌ Reply-to não funciona

**Causa:** Não configurado no template

**Solução:**
1. No template do EmailJS
2. Vá em **Settings**
3. Em **"Reply To"**, coloque: `{{ reply_to }}`
4. Save

---

## 📊 **RESUMO VISUAL**

```
FORMULÁRIO (Contact.jsx)
    ↓
    name: "João Silva"
    email: "joao@email.com"
    message: "Olá..."
    ↓
CÓDIGO (emailService.js)
    ↓
    templateParams = {
      from_name: "João Silva"    → {{ from_name }}
      from_email: "joao@email.com" → {{ from_email }}
      message: "Olá..."          → {{ message }}
    }
    ↓
EMAILJS TEMPLATE
    ↓
    Subject: Nova mensagem de {{ from_name }}
    Content: Nome: {{ from_name }}
             Email: {{ from_email }}
             Mensagem: {{ message }}
    ↓
SEU EMAIL
    ↓
    Subject: Nova mensagem de João Silva
    Content: Nome: João Silva
             Email: joao@email.com
             Mensagem: Olá...
```

---

## ✅ **TEMPLATE FINAL RECOMENDADO**

### **Subject:**
```
Nova mensagem de {{ from_name }} - Portfolio
```

### **Content (HTML):**
Use o template HTML completo acima para melhor visual!

### **Settings:**
- **Reply To:** `{{ reply_to }}`
- **To Email:** Seu email
- **From Name:** "Portfolio Contact Form"

---

## 🎉 **PRONTO!**

Agora você sabe:
- ✅ Quais variáveis usar
- ✅ Como adicionar novas variáveis
- ✅ Como formatar o email
- ✅ Como testar

**Dica:** Use o template HTML para emails mais profissionais! 🎨

---

**Documentação EmailJS:**
https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/
