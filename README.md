# Portfolio React - Desenvolvedor Frontend

Um portfolio moderno e responsivo desenvolvido com React, featuring integração com GitHub API, animações fluidas e design contemporary.

## 🚀 Características

- **5 Seções Principais**: Hero, Projetos, Habilidades, Sobre, Contato
- **Integração GitHub**: Dados em tempo real dos seus repositórios e estatísticas
- **Animações Modernas**: Usando Framer Motion para transições fluidas
- **Design Responsivo**: Adaptável para todos os tamanhos de tela
- **Tema Escuro/Claro**: Alternância de temas com persistência
- **Formulário de Contato**: Com validação e feedback visual
- **Performance**: Otimizado para velocidade e SEO

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações e transições
- **SCSS** - Estilização avançada
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Requisições HTTP
- **React Icons** - Ícones
- **GitHub API** - Integração de dados

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd react-portfolio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure seu username do GitHub:
Edite o arquivo `src/context/AppContext.jsx` e altere:
```jsx
githubUsername: 'seu-usuario-github'
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse: `http://localhost:3000`

## ⚙️ Configuração

### GitHub Integration

Para personalizar a integração com GitHub:

1. **Username**: Altere em `src/context/AppContext.jsx`
2. **Projetos em Destaque**: Edite em `src/components/Projects/Projects.jsx`
3. **Informações Pessoais**: Atualize em `src/components/Hero/Hero.jsx` e `src/components/About/About.jsx`

### Personalização

- **Cores**: Modifique as variáveis CSS em `src/styles/index.scss`
- **Fontes**: Altere no arquivo `index.html`
- **Conteúdo**: Edite os componentes individuais
- **Skills**: Atualize em `src/components/Skills/Skills.jsx`

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Header/         # Navegação
│   ├── Hero/           # Seção principal
│   ├── Projects/       # Showcase de projetos
│   ├── Skills/         # Habilidades técnicas
│   ├── About/          # Sobre + GitHub stats
│   ├── Contact/        # Formulário de contato
│   └── LoadingSpinner/ # Loading component
├── context/            # Context API
├── hooks/              # Custom hooks
├── services/           # API services
├── styles/             # Estilos globais
└── utils/              # Utilitários
```

## 🎨 Customização de Tema

O projeto suporta temas claro e escuro. Para personalizar:

1. Edite as variáveis CSS em `src/styles/index.scss`
2. Modifique o `ThemeContext` se necessário
3. Ajuste as cores dos componentes

## 📱 Responsividade

O design é mobile-first e inclui breakpoints para:
- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## 🚀 Deploy

### Vercel (Recomendado)

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Execute o deploy:
```bash
vercel
```

### Netlify

1. Build do projeto:
```bash
npm run build
```

2. Faça upload da pasta `dist` para o Netlify

### GitHub Pages

1. Instale o plugin:
```bash
npm install --save-dev gh-pages
```

2. Adicione no `package.json`:
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. Configure a base URL no `vite.config.js`:
```js
export default defineConfig({
  base: '/nome-do-repositorio/',
  // ...
})
```

## 📊 GitHub API

O projeto utiliza a API pública do GitHub para:
- Listar repositórios
- Estatísticas do perfil
- Linguagens de programação
- Atividade recente

**Rate Limits**: 60 requests/hora para usuários não autenticados.

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Verificação de código

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Contato

- **Email**: seu.email@example.com
- **LinkedIn**: [Seu Perfil](https://linkedin.com/in/seu-perfil)
- **GitHub**: [Seu GitHub](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!