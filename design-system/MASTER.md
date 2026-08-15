# Didi Team — Design System Master

> **REGRA DE HIERARQUIA:** Ao construir uma página, verifique primeiro
> `design-system/pages/[pagina].md`. Se existir, suas regras **sobrepõem** este
> Master. Caso contrário, siga estritamente este arquivo.

---

**Projeto:** Didi Team — Academia de Artes Marciais
**Stack alvo:** Astro + TypeScript (implementação futura)
**Gerado em:** 2026-08-15
**Categoria:** Sports / Martial Arts Gym (photography-driven)

---

## 0. Direção Visual Aprovada

**Direção escolhida:** A — **Editorial Minimalista**, com seções escuras intercaladas.

Decisões obrigatórias e imutáveis (registradas em 2026-08-15, aprovadas pelo responsável):

1. **Paleta principal = Preto + Branco + Vermelho.** Sem quarta cor cromática; cinzas neutros e `--color-ink`/`--color-paper` são tons de apoio, não cores.
2. **Vermelho com moderação.** Uso restrito a: CTAs, links ativos, marcador ativo de navegação, traços de marca e detalhes pontuais. Cobertura simultânea nunca ultrapassa ~8% da viewport.
3. **Tipografia fixa:** Bebas Neue para títulos/display; Source Sans 3 para corpo. Sem substituições.
4. **Fotografia grande e expressiva** é o recurso visual principal; layout serve a foto.
5. **Cantos predominantemente retos** (`border-radius: 0`). Exceção apenas em avatares de professor, se necessário.
6. **Uma ação principal por seção.** CTA vermelho único (máx. 1 por bloco).
7. **Sem gradientes decorativos.** Overlays planos semi-transparentes pretos são permitidos sobre fotos para legibilidade.
8. **Sem rolagem horizontal.** Layout responsivo验证ado em 375/768/1024/1440.
9. **Sem animações excessivas.** Transições só de estado (cor/borda), 150–250ms. Zero animações de entrada, parallax, scroll-snap decorativo, glow ou blur.
10. **Menu mobile compacto, acessível e sem esconder conteúdo.** Painel fullscreen preto ou drawer lateral; fecha com Esc; armadilha de foco; conteúdo da página permanece acessível (não fica mascarado atrás do header fixo).
11. **Seções claras e escuras alternadas** para criar ritmo visual editorial. Decisão por seção, não toggle global.
12. **Contraste WCAG AA** (4.5:1 corpo, 3:1 texto grande) e suporte a `prefers-reduced-motion` (desligar transições).

Estas regras **prevalecem** sobre qualquer conflito com seções seguintes. Em caso de dúvida, estas decidem.

---

## 1. Princípios de Design

1. **Preto, branco e vermelho.** Três cores. Nada mais na paleta central.
2. **Fotografia real é o recurso visual principal.** Layout serve a foto, não o contrário.
3. **Forte, profissional, esportivo, contemporâneo.** Sem nostalgia, sem "template genérico".
4. **Mobile-first.** Cada decisão é tomada em 375px antes de escalar.
5. **Sem excessos.** Sem gradientes, sem blur, sem glow, sem animações decorativas. Transições só para feedback de estado (150–250ms).
6. **Acessibilidade, SEO e performance são requisitos, não extras.**Tokens semânticos, contraste AA mínimo, imagens otimizadas, HTML semântico.

---

## 2. Paleta de Cores

Monocromática com um único acento cromático (vermelho). Repositório: Exaggerated Minimalism — "single vibrant accent only".

### Tokens centrais

| Token | Hex | Uso |
|------|-----|-----|
| `--color-black` | `#000000` | Fundos hero, tipografia de impacto, rodapé |
| `--color-white` | `#FFFFFF` | Fundos base, texto sobre preto |
| `--color-red` | `#E10600` | **Único acento cromático.** CTAs, links, marcadores, hover, detalhe de marca |
| `--color-ink` | `#0A0A0A` | Fundo secundário escuro (não-puro, reduz fadiga) |
| `--color-paper` | `#F4F4F4` | Fundo neutro claro alternativo |
| `--color-gray-900` | `#1A1A1A` | Superfícies escuras, cartões sobre preto |
| `--color-gray-600` | `#6B6B6B` | Texto secundário sobre fundo claro (≥4.5:1) |
| `--color-gray-400` | `#9A9A9A` | Texto terciário / dividers — só sobre escuro |
| `--color-line` | `#E5E5E5` | Bordas em modo claro |

### Regras deUsage

- **Vermelho é escasso e intencional.** Nunca cobrir mais que ~8% da viewport simultaneamente. Use para 1 CTA por seção, marcadores ativos e detalhes de marca.
- **Nunca usar vermelho como texto corrido** sobre fundo claro (falha contraste). Sobre preto, manter em títulos curtos e ícones.
- **Preto puro (#000) é permitido** em hero e rodapé; superfícies grandes usam `--color-ink` para reduzir fadiga.
- **Modos:** o site é dark-first, com seções claras intercaladas para ritmo editorial. Não é um toggle global; é decisão por seção.

### Tailwind (Astro config)

```ts
colors: {
  black: '#000000',
  white: '#FFFFFF',
  red: { DEFAULT: '#E10600', 600: '#C00500' },
  ink: '#0A0A0A',
  paper: '#F4F4F4',
  gray: { 900: '#1A1A1A', 600: '#6B6B6B', 400: '#9A9A9A' },
  line: '#E5E5E5',
}
```

---

## 3. Tipografia

Pareamento: **Bebas Neue** (display, títulos de impacto) + **Source Sans 3** (corpo). Condensado/all-caps no display entrega força esportiva sem peso decorativo; corpo limpo garante leitura longa.

| Função | Família | Peso | Notas |
|------|---------|------|------|
| Display / Hero | Bebas Neue | 400 | All-caps, letter-spacing 0.02em. Ideal para títulos curtos de luta |
| Subdisplay | Source Sans 3 | 700 | Subtítulos, nomes de modalidade, nomes de professor |
| Corpo | Source Sans 3 | 400 / 600 | Texto corrido, navegação, formulários |
| Mono / Labels | system-ui monospace | 500 | Eyebrows tipo "01 — MUAY THAI", labels de catalog |

### Escala tipográfica (clamp, mobile-first)

| Token | Clamp |
|------|------|
| `--text-hero` | `clamp(3.5rem, 14vw, 11rem)` |
| `--text-h1` | `clamp(2.75rem, 7vw, 5rem)` |
| `--text-h2` | `clamp(2rem, 4.5vw, 3.25rem)` |
| `--text-h3` | `clamp(1.5rem, 2.5vw, 2rem)` |
| `--text-body-lg` | `clamp(1.125rem, 1.2vw, 1.25rem)` |
| `--text-body` | `1rem` (16px mínimo) |
| `--text-sm` | `0.875rem` |
| `--text-label` | `0.75rem` all-caps letter-spacing 0.12em |

### CSS Import

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');
```

### Regras

- Linha de base de corpo: 1.6; títulos 1.05–1.15.
- Máximo ~66ch por coluna de texto corrido.
- Hero usado **uma vez por página**. Nunca repetir `--text-hero` na mesma página.
- Texto sobre foto: overlay plano semi-transparente preto (`rgba(0,0,0,.5)`) — não blur, não gradiente.

---

## 4. Espaçamento e Grid

| Token | Valor |
|------|------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 40px |
| `--space-2xl` | 64px |
| `--space-3xl` | 96px |
| `--space-section` | clamp(64px, 10vw, 128px) |

- **Container:** `max-width: 1280px`, padding lateral `clamp(20px, 5vw, 80px)`.
- **Grid de conteúdo:** 12 colunas no desktop, 1 coluna no mobile, gap 24px.
- **Gutters de seção:** `--space-section` acima e abaixo de cada bloco.

---

## 5. Imagem e Fotografia

Princípio: a fotografia **carrega** o visual. Trate-a como conteúdo de primeira classe.

- **Formato favorito:** full-bleed (sangrado) nas laterais, mantendo tipografia em coluna oposta/overlay.
- `aspect-ratio` declarado sempre (ex.: `16/9`, `4/5` para retratos de atleta, `3/4` para modalidade) — elimina layout shift.
- `loading="lazy"` e `decoding="async"` em tudo abaixo da dobra. Hero com `fetchpriority="high"`.
- `alt` **obrigatório** e descritivo em todas as fotos.
- Sem overlays decorativos (grãos, vignette, duotone) salvo exceção explícita.
- Astro `<Image>` / `<Picture>` para AVIF/WebP responsivo.

---

## 6. Componentes Base

### Botões

```css
.btn { padding: 14px 28px; border: 0; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em;
  cursor: pointer; transition: background-color 180ms ease, color 180ms ease; }

.btn-primary { background: var(--color-red); color: var(--color-white); }
.btn-primary:hover { background: var(--color-red-600); }

.btn-ghost { background: transparent; color: var(--color-white);
  border: 1px solid var(--color-white); }
.btn-ghost:hover { background: var(--color-white); color: var(--color-black); }

/* NUNCA usar scale/translate no hover — causa layout shift */
```

### Cartões (modalidade / produto)

```css
.card { background: var(--color-ink); border: 1px solid var(--color-gray-900);
  padding: 24px; border-radius: 0; cursor: pointer;
  transition: border-color 180ms ease; }
.card:hover { border-color: var(--color-red); }
/* Cantos retos (0px). Sem sombra. Sem elevação. A borda vermelha é o feedback. */
```

### Inputs

```css
.input { padding: 12px 16px; background: transparent;
  border: 1px solid var(--color-line); border-radius: 0;
  font-size: 1rem; transition: border-color 180ms ease; }
.input:focus { border-color: var(--color-red); outline: none;
  box-shadow: 0 0 0 2px rgba(225,6,0,.25); }
```

### Navegação

- Header fixo, **flutuante** com `top-4` lateral (não grudado em `top-0`).
- Mobile: menu hambúrguer fullscreen preto, lista Bebas Neue grande.
- Logo SVG… (a definir). Link ativo: traço vermelho embaixo (2px).

---

## 7. Estilo Visual Geral

**Estilo de referência:** Exaggerated Minimalism + Dark Mode (OLED), mesclados editorialmente.

- **Cantos retos** (`border-radius: 0`) em toda a UI. Sem arredondamento genérico de template.
- **Bordas finas visíveis** (1px) como ferramenta estrutural, não decoração.
- **Sem sombras** salvo rara exceção editorial. Hierarquia via cor, tipo e espaço.
- **Whitespace radical** entre seções. `--space-section` é generoso.
- **Tipografia oversized** no hero (clamp até 11rem).
- **Transições mínimas:** 150–250ms, apenas `color` / `background-color` / `border-color`.
- **Zero de:** gradientes, blur/backdrop-filter, glow/text-shadow, animações de entrada, parallax, scroll-snap decorativo.

---

## 8. Padrão de Página (estrutura-base)

Cada página segue a ordem editorial abaixo, adaptando conteúdo:

1. **Hero full-bleed** — fotografia de fundo + título Bebas Neue oversized + 1 CTA vermelho. Eyebrow mono com índice ("01 — MUAY THAI").
2. **Bloco editorial** — coluna texto + coluna foto, alternando claro/escuro entre seções.
3. **Grade de cartões** (modalidades / produtos / galeria) — grid 12 col, sem cards "flutuantes", só borda.
4. **Citação / prova social** — frase grande sobre preto, foto do atleta ao lado.
5. **CTA final** — faixa vermelha ou preta, 1 botão, 1 frase.
6. **Rodapé** — preto, links em Source Sans 3, marca em Bebas Neue.

CTA único por seção. Sem carrosséis automáticos. Sem modais de marketing.

---

## 9. Páginas e Overrides

| Página | Considerações | Override |
|------|------|------|
| Home | Hero cinematográfico; sumário das modalidades em grade | `pages/home.md` (opcional) |
| Modalidades (índex) | Grade 12 col com 5 cards → 2 + 3 em desktop | `pages/modalidades.md` |
| Muay Thai / Boxe / MMA / Luta Livre / Jiu-Jitsu | Mesmo template de modalidade: hero, história, professor*, galeria, CTA | `pages/modalidade.md` |
| Professor | Retrato 4/5 + biografia editorial + timeline | `pages/professor.md` |
| Galeria | Masonry estrito com aspect-ratio definido; lightbox accessível | `pages/galeria.md` |
| Loja (catálogo) | Grid de produtos 3 col desktop; sem checkout — link/CTA externo | `pages/loja.md` |
| Contato | Formulário + mapa + horários; layout 2 col no desktop | `pages/contato.md` |

Os arquivos de override serão criados quando definirmos cada layout.

---

## 10. Acessibilidade

- Contraste mínimo **4.5:1** texto corrido, **3:1** texto grande (Bebas Neue hero OK em branco puro sobre preto). Confere regra #12 da seção 0.
- Cor **nunca** é o único indicador: link com sublinhado, estado ativo com marcador de ícone/borda.
- `<img alt>` descritivo; fotos puramente decorativas: `alt=""`.
- Foco visível: `outline: 2px solid var(--color-red); outline-offset: 2px`. Nunca `outline: none` sem alternativa.
- Navegação por teclado funcional; menu mobile fecha com Esc e armadilha de foco.
- `prefers-reduced-motion: reduce` → desabilitar todas as transições.
- `<form>` com `<label>` explícito, `aria-required`, mensagens de erro com `aria-describedby`.

---

## 11. SEO e Performance

- **HTML semântico:** `<header>`, `<main>`, `<article>`, `<section aria-labelledby>`, `<nav>`, `<footer>`.
- `<title>` + `<meta description>` únicos por página; Open Graph + Twitter Card com imagem real.
- dados estruturados: `LocalBusiness` / `HealthAndBeautyBusiness` (academia), `BreadcrumbList`, `Person` para professor.
- Imagens: AVIF → WebP → JPG; `width`/`height` declarados; `<picture>` com breakpoints.
- Fontes: `display=swap`, `preload` da Bebas Neue e Source Sans 3 críticas; subset latin.
- CSS crítico inline; sem frameworks JS pesados. Astro = HTML estático por padrão.
- Lighthouse alvo: Performance ≥ 90, Acessibilidade ≥ 95, SEO = 100.

---

## 12. Anti-Padrões (proibido)

- ❌ Qualquer cor fora da paleta preto/branco/vermelho (e grays neutros).
- ❌ Gradientes, blur, glow, text-shadow colorido, vignette, film-grain.
- ❌ Emojis como ícones — usar SVG (Lucide).
- ❌ `border-radius` > 0 em componentes (exceção possível só em avatares de professor).
- ❌ Hover com `scale`/`translate` que desloca layout.
- ❌ Carrosséis automáticos, modais de saída, pop-ups de captura.
- ❌ Texto sobre foto sem overlay — legibilidade comprometida.
- ❌ Vermelho como texto corrido sobre fundo claro.
- ❌ Templates "card flutuante com sombra" genéricos.
- ❌ Esquecer `cursor: pointer` em elementos clicáveis.
- ❌ `transition` acima de 250ms em feedback de UI.

---

## 13. Checklist Pré-Entrega

- [ ] Sem emojis como ícone (SVG Lucide)
- [ ] `cursor-pointer` em todo clicável
- [ ] Hovers só cor/borda, 150–250ms
- [ ] Contraste ≥ 4.5:1 em texto corrido
- [ ] Foco visível (outline vermelho)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Responsivo: 375, 768, 1024, 1440px — sem scroll horizontal
- [ ] Nada atrás de header fixo (padding-top)
- [ ] Todas as fotos com `alt`, `width`, `height`, formatos modernos
- [ ] `<title>`/`<meta>`/OG por página
- [ ] HTML semântico + dados estruturados
