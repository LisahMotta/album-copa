# ⚽ Álbum Copa do Mundo — PWA

Aplicativo web progressivo (PWA) para controle de figurinhas Panini da Copa do Mundo.  
Desenvolvido com **React + Vite**, pronto para deploy no **Railway**.

---

## Funcionalidades

- **Painel Geral** — todas as figurinhas com filtros (todas / faltam / repetidas)
- **Por Seleção** — 32 seleções organizadas por grupo, com progresso individual
- **Figurinhas Retidas** — seção especial para figurinhas guardadas antes de colar
- Toque numa figurinha para: coletar, marcar como repetida, reter ou remover
- Contador de repetidas por figurinha
- Dados salvos no `localStorage` (funciona offline)
- **Instalável como PWA** em Android e iOS

---

## Estrutura do projeto

```
album-copa/
├── public/
│   ├── icon.svg          # Ícone SVG do app
│   ├── icon-192.png      # Ícone PWA (gerar com script abaixo)
│   ├── icon-512.png      # Ícone PWA grande
│   └── manifest.json     # Manifesto PWA
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── FigModal.jsx
│   │   ├── Figurinha.jsx
│   │   ├── Header.jsx
│   │   ├── Painel.jsx
│   │   ├── Retidas.jsx
│   │   ├── Selecoes.jsx
│   │   ├── StatsBar.jsx
│   │   └── Toast.jsx
│   ├── data/
│   │   └── dados.js       # Seleções, posições, funções de coleção
│   ├── hooks/
│   │   └── useColecao.js  # Hook de estado + localStorage
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── railway.toml
└── vite.config.js
```

---

## Rodando localmente

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) Gerar ícones PNG — requer a lib canvas
npm install canvas --save-dev
node scripts/gerar-icones.js

# 3. Rodar em desenvolvimento
npm run dev

# 4. Build de produção
npm run build
npm run preview
```

---

## Deploy no Railway

### Opção A — Via GitHub (recomendado)

1. Crie um repositório no GitHub e faça push do projeto:

```bash
git init
git add .
git commit -m "feat: álbum copa do mundo PWA"
git remote add origin https://github.com/LisahMotta/album-copa.git
git push -u origin main
```

2. No Railway:
   - New Project → Deploy from GitHub repo
   - Selecione o repositório `album-copa`
   - O Railway detecta o `Dockerfile` automaticamente
   - Clique em **Deploy**

3. Em **Settings → Networking**, gere um domínio público.

### Opção B — Railway CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## Ícones PWA (importante para instalação)

Os arquivos `icon-192.png` e `icon-512.png` precisam existir em `/public`.  
Você pode:

- **Usar o script gerador** (requer `canvas`):
  ```bash
  npm install canvas --save-dev
  node scripts/gerar-icones.js
  ```

- **Converter o SVG manualmente** em https://cloudconvert.com/svg-to-png  
  (gere nas resoluções 192×192 e 512×512 e salve em `/public`)

- **Usar qualquer imagem PNG** de sua preferência como ícone

---

## Personalizações fáceis

| O que mudar | Onde |
|---|---|
| Lista de seleções | `src/data/dados.js` → `SELECOES` |
| Posições/jogadores | `src/data/dados.js` → `POSICOES` |
| Cores do app | `src/styles/global.css` → `:root` |
| Nome do app | `public/manifest.json` + `index.html` |

---

## Tecnologias

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app)
- [Railway](https://railway.app) para deploy
- `localStorage` para persistência dos dados
