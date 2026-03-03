# Instrucoes de Desenvolvimento — Portfolio Win98 em React + Vite + Tailwind

> Documento de referencia para guiar um LLM no desenvolvimento deste projeto.
> Leia este arquivo inteiro antes de escrever qualquer codigo.

---

## 1. Visao Geral do Projeto

Portfolio pessoal com **tema visual Windows 98/XP**. A identidade e construida sobre a ilusao de profundidade 3D classica (bordas `inset` empilhadas) aplicada a componentes modernos de React.

**Stack obrigatoria:**
- React 18+ com Vite
- Tailwind CSS v3
- TypeScript
- Sem UI libs externas (shadcn, MUI, Radix etc.) — o visual e 100% custom

**Referencia visual canonica:** o arquivo `portfolio-win98.html` entregue junto a este documento. Qualquer duvida sobre aparencia, consulte ele primeiro.

---

## 2. Estrutura de Pastas

```
src/
├── components/
│   ├── layout/
│   │   ├── Desktop.tsx        # wrapper da area de trabalho
│   │   ├── Taskbar.tsx        # barra de tarefas fixa no rodape
│   │   ├── StartMenu.tsx      # menu iniciar
│   │   └── DesktopIcons.tsx   # icones fixos a esquerda
│   ├── ui/
│   │   ├── Window.tsx         # janela reutilizavel (titlebar + body + statusbar)
│   │   ├── Button.tsx         # botao Win98 (raised / primary)
│   │   ├── Input.tsx          # input sunken
│   │   ├── Textarea.tsx       # textarea sunken
│   │   ├── ProgressBar.tsx    # barra listrada azul
│   │   ├── Tag.tsx            # tag raised cinza
│   │   └── GroupBox.tsx       # caixa com legenda (fieldset visual)
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Tech.tsx
│       ├── Projects.tsx
│       └── Contact.tsx
├── hooks/
│   ├── useClock.ts            # relogio da taskbar
│   ├── useScrollReveal.ts     # IntersectionObserver para animacoes
│   └── useProgressBar.ts      # anima barras ao entrar na tela
├── data/
│   ├── techs.ts               # array de tecnologias
│   └── projects.ts            # array de projetos
├── types/
│   └── index.ts               # interfaces compartilhadas
└── App.tsx                    # monta Desktop + secoes
```

---

## 3. Design Tokens — `tailwind.config.ts`

Adicione estes tokens em `tailwind.config.ts`. **Nao use valores de cor hardcoded no JSX — sempre referencie os tokens.**

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        win: {
          gray:   '#c0c0c0',
          dark:   '#808080',
          darker: '#404040',
          white:  '#ffffff',
          black:  '#000000',
          navy:   '#000080',
          teal:   '#008080',
          blue:   '#1084d0',
        },
      },
      fontFamily: {
        win: ['Tahoma', 'MS Sans Serif', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '10': '10px',
        '11': '11px',
        '12': '12px',
        '13': '13px',
      },
      boxShadow: {
        // NUNCA altere esses valores — sao o coracao visual do tema
        'raised': [
          'inset -1px -1px 0 #404040',
          'inset  1px  1px 0 #ffffff',
          'inset -2px -2px 0 #808080',
          'inset  2px  2px 0 #dfdfdf',
        ].join(', '),
        'sunken': [
          'inset  1px  1px 0 #404040',
          'inset -1px -1px 0 #ffffff',
          'inset  2px  2px 0 #808080',
          'inset -2px -2px 0 #dfdfdf',
        ].join(', '),
        'win-outer': '2px 2px 0 #000000',
        'groupbox':  'inset 1px 1px 0 #ffffff',
      },
      backgroundImage: {
        'progress': 'repeating-linear-gradient(90deg, #000080 0px, #000080 8px, #1084d0 8px, #1084d0 12px)',
        'titlebar': 'linear-gradient(90deg, #000080, #1084d0)',
        'photo':    'linear-gradient(145deg, #a0a0a0, #d0d0d0)',
      },
      keyframes: {
        windowOpen: {
          from: { transform: 'scale(0.97) translateY(6px)', opacity: '0.5' },
          to:   { transform: 'scale(1) translateY(0)',      opacity: '1'   },
        },
        fadeUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        menuPop: {
          from: { transform: 'scaleY(0.6)', opacity: '0' },
          to:   { transform: 'scaleY(1)',   opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,204,68,0.6)' },
          '50%':      { boxShadow: '0 0 0 5px rgba(0,204,68,0)'  },
        },
      },
      animation: {
        'window-open': 'windowOpen 0.18s ease-out',
        'fade-up':     'fadeUp 0.4s ease forwards',
        'menu-pop':    'menuPop 0.12s ease-out',
        'blink':       'blink 1.1s step-end infinite',
        'pulse-dot':   'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## 4. Componentes UI — Contratos de API

### `<Window>`

O bloco mais importante. **Toda secao do portfolio e uma janela.**

```tsx
interface WindowProps {
  icon:       string            // emoji do icone na titlebar
  title:      string            // texto da titlebar
  statusBar?: string[]          // celulas do rodape (opcional)
  children:   React.ReactNode
  className?: string
  style?:     React.CSSProperties
}
```

Regras visuais obrigatorias:
- Fundo: `bg-win-gray`
- Borda: `border-2 border-t-win-white border-l-win-white border-r-win-dark border-b-win-dark`
- Sombra externa: `shadow-win-outer`
- Animacao de entrada: `animate-window-open`
- Title bar: `bg-titlebar` com texto branco bold 11px
- Botoes `_ □ x`: `shadow-raised`, 16x14px, `tabIndex={-1}`, `aria-hidden="true"` (sem funcao real)

### `<Button>`

```tsx
interface ButtonProps {
  variant?:   'default' | 'primary'
  href?:      string       // se presente, renderiza <a>; senao <button>
  onClick?:   () => void
  children:   React.ReactNode
  className?: string
}
```

- `default`: `shadow-raised bg-win-gray`
- `primary`: `shadow-raised bg-win-gray font-bold ring-1 ring-black`
- `:active`:  `shadow-sunken`

### `<ProgressBar>`

```tsx
interface ProgressBarProps {
  value:     number     // 0-100
  animated?: boolean    // controla se a animacao de entrada ja disparou
}
```

- Container: `bg-white shadow-sunken h-[14px] overflow-hidden`
- Fill: `bg-progress h-full transition-[width] duration-[1300ms]`
- Largura: `w-0` -> `w-[${value}%]` quando `animated` vira `true`

### `<GroupBox>`

```tsx
interface GroupBoxProps {
  legend:   string
  children: React.ReactNode
}
```

Renderiza como `<fieldset>` + `<legend>`. Borda: `border border-win-dark shadow-groupbox`. Legend: `bg-win-gray px-1 text-11 font-bold`.

---

## 5. Hooks

### `useClock`

```ts
// Retorna string "HH:MM" atualizada a cada segundo
function useClock(): string
```

### `useScrollReveal`

```ts
// Retorna ref. Quando o elemento entra na viewport, adiciona a classe `visible`
// para disparar transicoes CSS definidas no componente.
function useScrollReveal(
  options?: IntersectionObserverInit
): React.RefObject<HTMLDivElement>
```

Padrao: `{ threshold: 0.08, rootMargin: '0px 0px -30px 0px' }`

> **Nao use framer-motion ou react-spring.** Apenas `IntersectionObserver` + classes Tailwind com `transition`.

### `useProgressBar`

```ts
// Retorna ref e flag `animated`.
// Quando o elemento entra na viewport, `animated` vira true.
function useProgressBar(): {
  ref:      React.RefObject<HTMLLIElement>
  animated: boolean
}
```

---

## 6. Tipos e Dados

```ts
// src/types/index.ts

export interface Tech {
  name:  string
  level: number   // 0-100
}

export interface Project {
  id:    string
  num:   string   // ex: "01"
  title: string
  desc:  string
  tags:  string[]
  color: string   // hex — cor da mini-janela de preview
  demo:  string   // URL
  repo:  string   // URL
}
```

```ts
// src/data/techs.ts
import type { Tech } from '../types'

export const techs: Tech[] = [
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 92 },
  { name: 'React',      level: 90 },
  { name: 'Node.js',    level: 88 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'Python',     level: 75 },
  { name: 'Docker',     level: 78 },
  { name: 'Git',        level: 93 },
]
```

```ts
// src/data/projects.ts
import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'saas-dashboard', num: '01',
    title: 'SaaS Dashboard',
    desc:  'Analytics em tempo real para e-commerce com relatorios e permissoes granulares.',
    tags:  ['React', 'Node.js', 'PostgreSQL'],
    color: '#000080', demo: '#', repo: '#',
  },
  {
    id: 'api-gateway', num: '02',
    title: 'API Gateway',
    desc:  'Microsservico com rate limiting, JWT e documentacao OpenAPI automatica.',
    tags:  ['Node.js', 'Docker', 'Redis'],
    color: '#006400', demo: '#', repo: '#',
  },
  {
    id: 'devcollab', num: '03',
    title: 'DevCollab',
    desc:  'Plataforma colaborativa com gestao de sprints e notificacoes via WebSocket.',
    tags:  ['React', 'Python', 'FastAPI'],
    color: '#800000', demo: '#', repo: '#',
  },
]
```

---

## 7. Secoes — Responsabilidades

### `<Hero>`
- Grid 2 colunas: identidade (esquerda) + janela de codigo decorativa (direita)
- A janela de codigo e um `<Window>` aninhado com `<pre>` e syntax highlight manual via `<span>`
- Classes de syntax highlight (definir no CSS global): `.ck` keyword, `.cf` function, `.cs` string, `.cc` comment, `.cn` number, `.cp` punctuation
- Animacao de entrada: `animate-fade-up` com `animationDelay` crescente nos filhos via `style`
- Status bar: `['5 anos de experiencia', '30+ projetos entregues', '12+ clientes']`

### `<About>`
- Grid `auto 1fr`: foto placeholder (esquerda) + bio (direita)
- Foto: `div` com `bg-photo shadow-sunken` + iniciais em texto grande, `aria-hidden="true"`

### `<Tech>`
- Mapeia o array `techs` em grid 4 colunas
- Cada item usa `useProgressBar` para animar a barra ao entrar na tela
- Estrutura por item: nome + `<ProgressBar>` + percentual

### `<Projects>`
- Mapeia o array `projects` em grid 3 colunas
- Cada card contem uma **mini `<Window>`** decorativa com linhas coloridas baseadas em `project.color`
- O titlebar da mini-janela usa `background: linear-gradient(90deg, color, color + '99')`

### `<Contact>`
- Grid `1.1fr 0.9fr`: formulario (esquerda) + informacoes (direita)
- Formulario: `<Input>`, `<Textarea>`, `<Button variant="primary">`
- Info: `<GroupBox legend="Contatos">` com lista de links + div de status online

---

## 8. Layout Global

### `<Desktop>`
- `min-h-screen pb-[30px] bg-win-teal font-win`
- Padding: `20px 24px 40px 100px` (espaço para os icones fixos a esquerda)
- `flex flex-col gap-5`

### `<Taskbar>`
- `fixed bottom-0 left-0 right-0 h-[30px] z-[9999]`
- `bg-win-gray border-t-2 border-win-white`
- Estado `startMenuOpen` gerenciado aqui (ou em Context se necessario)
- Conteudo: botao Iniciar + separador + links ancora para secoes + `<Clock>`

### `<StartMenu>`
- `fixed bottom-[30px] left-0 z-[10000] animate-menu-pop`
- `transform-origin: bottom left`
- Fecha ao clicar fora: `useEffect` com `document.addEventListener('click', close)`
- Visibilidade controlada por prop `isOpen` recebida do `<Taskbar>`

### `<DesktopIcons>`
- `fixed top-5 left-[14px] z-10`
- `hidden md:flex flex-col gap-[18px]` — oculto em mobile

---

## 9. Responsividade

| Breakpoint Tailwind | Regra |
|---|---|
| `< md` (768px) | Desktop icons ocultos; grids 2 col -> 1 col; grid-3 -> 2 col |
| `< sm` (640px) | grid-3 -> 1 col; grid-4 -> 2 col; form row -> 1 col |

Nao crie breakpoints customizados. Use apenas `md:` e `sm:` do Tailwind.

---

## 10. Acessibilidade — Obrigatorio

- `<section>` com `aria-labelledby` apontando para o `id` do titulo da janela
- Botoes decorativos `_ □ x`: `tabIndex={-1}` e `aria-hidden="true"`
- Emojis decorativos: `aria-hidden="true"`
- `<ProgressBar>`: `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax`
- Todos os inputs com `<label htmlFor>` correspondente
- Links externos: `target="_blank" rel="noopener noreferrer"`
- `<form>` com `noValidate`

---

## 11. CSS Global — `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html { scroll-behavior: smooth; font-size: 11px; }

/* Scrollbar estilo Win98 */
::-webkit-scrollbar       { width: 16px; }
::-webkit-scrollbar-track { @apply bg-win-gray shadow-sunken; }
::-webkit-scrollbar-thumb { @apply bg-win-gray shadow-raised; }

/* Syntax highlight do bloco de codigo no Hero */
.ck { color: #b0b0ff; } /* keyword     */
.cf { color: #80ffff; } /* function    */
.cs { color: #ffff80; } /* string      */
.cc { color: #80ff80; } /* comment     */
.cn { color: #ff80c0; } /* number      */
.cp { color: #ffffff; } /* punctuation */
```

---

## 12. Regras — Nunca Quebre Estas

1. **Sem bibliotecas de UI** — MUI, shadcn, Chakra, Radix estao proibidos. Visual 100% custom.
2. **Sem framer-motion** ou similares. Animacoes via CSS transitions + `IntersectionObserver`.
3. **Sem cores hardcoded no JSX.** Sempre use classes `win-*` do Tailwind config.
4. **Nao altere `shadow-raised` e `shadow-sunken`.** Sao a identidade visual do tema.
5. **Um componente por arquivo.**
6. **Dados sempre em `src/data/`**, nunca embutidos no JSX de um componente.
7. **TypeScript estrito** — toda prop com interface, zero `any`.
8. **HTML semantico** — `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<form>`.
9. **Reutilize antes de criar** — verifique `src/components/ui/` antes de criar novo componente.

---

## 13. Setup Inicial

```bash
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Substitua `tailwind.config.ts` pelo conteudo da secao 3.
Substitua `src/index.css` pelo conteudo da secao 11.

---

## 14. Ordem de Implementacao Sugerida

1. Setup + `tailwind.config.ts` completo com todos os tokens
2. `<Window>` — testar isolado antes de continuar
3. Demais componentes UI: `<Button>`, `<Input>`, `<Textarea>`, `<Tag>`, `<ProgressBar>`, `<GroupBox>`
4. `<Desktop>` + `<Taskbar>` sem Start Menu
5. `<Hero>` — primeira secao visivel
6. `<StartMenu>` + toggle
7. `<DesktopIcons>`
8. `<About>` -> `<Tech>` -> `<Projects>` -> `<Contact>`
9. Hooks: `useClock`, `useScrollReveal`, `useProgressBar`
10. Responsividade mobile
11. Auditoria de acessibilidade (Lighthouse ou axe DevTools)
