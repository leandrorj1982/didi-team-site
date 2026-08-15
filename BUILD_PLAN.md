# Didi Team — BUILD_PLAN

Plano de construção do site (Astro + TypeScript). Apenas planejamento: **não
inicia o projeto Astro nem implementa páginas nesta etapa.**

Referências obrigatórias:
- `design-system/MASTER.md` — design system (decisões aprovadas na seção 0).
- Direção visual aprovada: **Direção A — Editorial Minimalista, com seções
  escuras intercaladas.**

Restrições técnicas acordadas (regem todo o plano):
- Astro + TypeScript, **sem React/Preact/Vue/Solid**.
- **CSS próprio** baseado em `design-system/MASTER.md` (**sem Tailwind**).
- Modalidades em **Markdown comum** (sem MDX); produtos, galeria e nav em TS.
- Interatividade via componentes Astro + TS nativo (`MobileNav` com
  progressive enhancement; `Lightbox` com `<dialog>` nativo). **Sem
  `client:visible`/`client:load`.**
- **Não inventar dados reais** (endereço, horários, preços, credenciais…):
  usar `TODO:` visíveis. JSON-LD só com dados reais visíveis.

---

## 1. Arquitetura (Astro + TypeScript)

### 1.1 Por que Astro

- Saída **HTML estático** por padrão → máximo desempenho e SEO.
- **Sem React, Preact, Vue, Solid ou qualquer framework de interface.** Toda
  interatividade é feita com **componentes Astro + HTML semântico + TypeScript
  nativo** (script `<script>` do Astro, sem ilhas reativas).
- `MobileNav` disponível imediatamente (progressive enhancement: funciona como
  navegação por anchor mesmo sem JS). `Lightbox` usa o elemento **`<dialog>`
  nativo** quando adequado. **Não usar `client:visible` nem `client:load`.**
- Suporte nativo a TypeScript, **Markdown comum** para conteúdo das modalidades
  (sem MDX — não há componentes dentro do conteúdo) e `<Image>` do
  `astro:assets` para AVIF/WebP responsivo.

### 1.2 Rendering

| Tipo de rota | Modo | Motivo |
|------|------|------|
| Home, Modalidades, cada modalidade, Professor, Galeria, Contato | `output: static` (pré-renderizado) | Conteúdo majoritariamente estático, ótimo SEO/CWV |
| Loja (catálogo) | `static` com conteúdo em TS | Sem checkout — contato via WhatsApp |
| Sitemap, robots | gerados por integração `@astrojs/sitemap` | automático |

### 1.3 TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`.
- Tipos centrais em `src/types/` (ex.: `Modalidade`, `Produto`, `MenuItem`,
  `ConfigSite`).
- Conteúdo tipado: **Content Collections com Markdown comum** (não MDX) para
  modalidades; arrays tipados em TS para produtos, galeria e nav. Nunca `any`.

### 1.4 Dependências previstas (mínimo)

- `astro` (núcleo)
- `@astrojs/sitemap`
- `lucide-static` (ícones SVG)
- Metadados SEO via componente próprio (sem `astro-seo`)

**Não instalar:**

- ❌ React, Preact, Vue, Solid, Svelte ou qualquer framework de interface
- ❌ Tailwind (ou qualquer utility CSS framework) — estilos em **CSS próprio
  baseado nos tokens do `design-system/MASTER.md`** (`src/styles/tokens.css` +
  `base.css` + CSS escopado por componente via `<style>` do Astro)
- ❌ `@astrojs/mdx`, `@astrojs/react`, `@astrojs/preact`, etc.
- ❌ jQuery, GSAP, Framer Motion ou qualquer lib de animação

---

## 2. Estrutura de Pastas

```
diditeam-site/
├─ public/
│  ├─ fonts/                 # Bebas Neue + Source Sans 3 self-hosted (subset latin)
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ og-default.jpg
├─ src/
│  ├─ assets/                # imagens processadas pelo astro:assets
│  │  ├─ home/
│  │  ├─ modalidades/
│  │  ├─ professor/
│  │  ├─ galeria/
│  │  └─ loja/
│  ├─ components/
│  │  ├─ layout/
│  │  │  ├─ BaseLayout.astro
│  │  │  ├─ Header.astro
│  │  │  ├─ Footer.astro
│  │  │  ├─ MobileNav.astro        # componente Astro + TS nativo (progressive enhancement, foco trap)
│  │  │  └─ SeoMeta.astro
│  │  ├─ ui/
│  │  │  ├─ Button.astro
│  │  │  ├─ Card.astro             # card de modalidade/produto
│  │  │  ├─ Container.astro
│  │  │  ├─ Section.astro          # alternância claro/escuro (theme prop)
│  │  │  ├─ Eyebrow.astro          # label mono "01 — MUAY THAI"
│  │  │  ├─ Icon.astro             # wrapper Lucide
│  │  │  └─ Photo.astro            # wrapper affordances + aspect-ratio + alt obrigatório
│  │  ├─ home/
│  │  │  ├─ HeroHome.astro
│  │  │  ├─ ModalidadesGrid.astro
│  │  │  ├─ ProfessorTeaser.astro
│  │  │  └─ CtaFinal.astro
│  │  ├─ modalidade/
│  │  │  ├─ HeroModalidade.astro
│  │  │  ├─ HistoriaModalidade.astro
│  │  │  └─ GaleriaModalidade.astro
│  │  ├─ galeria/
│  │  │  └─ Lightbox.astro         # componente Astro + <dialog> nativo (TS nativo, sem client:visible)
│  │  └─ contato/
│  │     ├─ ContatoForm.astro      # estático com mailto/POST → sem JS obrigatório
│  │     └─ MapaHorarios.astro
│  ├─ content/
│  │  ├─ modalidades/              # 5 arquivos .md (Markdown comum, sem MDX)
│  │  └─ config.ts                 # schema Zod das modalidades
│  ├─ data/
│  │  ├─ site.ts                   # nome, contato, redes, endereço (tipado) — VALORES PLACEHOLDER até fornecidos
│  │  ├─ nav.ts                    # estrutura do menu (tipado)
│  │  ├─ produtos.ts               # catálogo da loja (tipado) — VALORES PLACEHOLDER
│  │  └─ galeria.ts                # índice de imagens da galeria (tipado) — imagens a fornecer
│  ├─ layouts/
│  │  └─ BaseLayout.astro          # (alias de components/layout/BaseLayout)
│  ├─ pages/
│  │  ├─ index.astro               # Home
│  │  ├─ modalidades/
│  │  │  └─ index.astro            # índice das modalidades
│  │  ├─ modalidades/[slug].astro  # rota dinâmica cada modalidade
│  │  ├─ professor.astro
│  │  ├─ galeria.astro
│  │  ├─ loja.astro
│  │  ├─ contato.astro
│  │  ├─ 404.astro
│  │  └─ rss.xml.ts                # (opcional, feed de notícias futuras)
│  ├─ styles/
│  │  ├─ tokens.css                # CSS variables do MASTER.md (cores, escala, espaço)
│  │  └─ base.css                  # reset + base typográfica
│  └─ types/
│     ├─ modalidade.ts
│     ├─ produto.ts
│     ├─ nav.ts
│     ├─ galeria.ts
│     └─ site.ts
├─ design-system/
│  ├─ MASTER.md
│  └─ pages/                        # overrides por página (criados ao implementar cada uma)
├─ scripts/                        # utilitários build-time (ex.: checar alt em <img>)
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json
├─ BUILD_PLAN.md  ← (este arquivo)
└─ README.md
```

> **Sem `tailwind.config.ts`.** Estilos são CSS próprio baseado em
> `src/styles/tokens.css` (espelha `design-system/MASTER.md`).

**Convenções de nome:** `PascalCase.astro` para components; `kebab-case` para
arquivos de conteúdo; rotas espelham as URLs amigáveis.

---

## 3. Componentes Compartilhados

### 3.1 `BaseLayout.astro`
- Recebe: `title`, `description`, `image?`, `canonical?`, `theme? ("light"|"dark")`.
- Renderiza `<html lang="pt-BR">`, `<head>` (SEO, fontes pré-carregadas, CSS
  crítico inline), `<Header/>`, `<slot/>`, `<Footer/>`.
- Injeta `application/ld+json` (LocalBusiness, BreadcrumbList por página).

### 3.2 `Header.astro` (desktop) + `MobileNav.astro` (componente Astro nativo)
- Desktop: header flutuante `top-4`, logo SVG, navegação horizontal.
- Ativo: traço vermelho 2px abaixo do link.
- Mobile: botão hambúrguer abre **drawer lateral** (não overlay que esconde
  conteúdo).
  - **Componente Astro + TypeScript nativo** (sem React, sem `client:load`).
    Progressive enhancement: a navegação funciona como links âncora mesmo sem
    JS; o JS aprimora abertura/fechamento, foco armadilhado e `Esc`.
  - `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal="true"`.
  - `prefers-reduced-motion`: sem slide, só `opacity`.
- Header não deve sobrepor conteúdo: `<main>` tem `scroll-margin-top`.

### 3.2b `Lightbox.astro` (galeria)
- **Componente Astro + TypeScript nativo** usando o elemento **`<dialog>`**
  nativo do HTML quando adequado (`.showModal()` / `Esc` nativo).
- **Sem `client:visible`.** Script único e leve embutido pelo Astro.
- `role="dialog"` implícito no `<dialog>`; `aria-label` descritivo; navegação
  por teclado (setas Próximo/Anterior, `Esc` fecha — `Esc` é nativo do `<dialog>`).
- Funciona sem JS? Em modo graceful, as imagens da galeria permanecem visíveis
  como galeria estática; o `<dialog>` é aprimorado pelo script.

### 3.3 `Section.astro`
- Props: `theme: "light" | "dark"`, `id`, `eyebrow?`, `title?`.
- Renderiza `<section>` com padding `--space-section` e tema de fundo
  alternado (white ⇄ ink). Controla o ritmo editorial claro/escuro.

### 3.4 `Button.astro`
- Variantes: `primary` (vermelho), `ghost` (contorno branco/preto conforme
  tema), `link`. Sempre `cursor: pointer`; `:focus-visible` com outline
  vermelho; sem `scale` no hover.

### 3.5 `Card.astro`
- Usado em Modalidades e Loja. Borda 1px, cantos retos, hover = borda vermelha.
- Props: `image` (obrigatório com alt), `title`, `eyebrow`, `href`.

### 3.6 `Photo.astro`
- Wrapper de `astro:assets` que **exige** `alt` e declara `aspect-ratio`.
- Aplica `loading="lazy"` / `decoding="async"` automaticamente; hero recebe
  `fetchpriority="high"`.
- Opcional: overlay plano `rgba(0,0,0,.5)` via prop `overlay`.

### 3.7 `Eyebrow.astro`
- Renderiza label mono com índice: `<p>01 — Muay Thai</p>` em Source Sans 3
  600, `letter-spacing: 0.12em`, uppercase, `--text-label`.

### 3.8 `Icon.astro`
- Wrapper para Lucide SVG estático. Sem emojis em UI.

### 3.9 `SeoMeta.astro`
- Gera `<title>`, `<meta description>`, canonical, Open Graph, Twitter Card.

---

## 4. Organização de Conteúdo

> **Regra de conteúdo:** não inventar endereço, horários, preços, credenciais
> do professor, biografia, telefonemas, redes sociais, nem descrição de
> produtos. Enquanto dados reais não forem fornecidos, usar **placeholders
> explícitos e visíveis** marcados com `TODO:` nos arquivos de dados e exibir
> "Conteúdo a fornecer" (ou similar) na página — nunca texto fabricado se
> parecendo real. Dados estruturados (JSON-LD) só são emitidos para campos com
> dados reais e visíveis na página (ver seção 7.1).

### 4.1 Modalidades (5)
Cada modalidade é um arquivo em **Markdown comum** (não MDX) em
`src/content/modalidades/`:

```
content/modalidades/
  muay-thai.md     boxe.md     mma.md     luta-livre.md     jiu-jitsu.md
```

Schema (Zod em `src/content/config.ts`):

```ts
Modalidade = {
  slug: string
  titulo: string          // "Muay Thai"
  ordem: number           // 1..5
  resumo: string          // 1 frase para o card do índice
  historia: string        // Markdown body — origem, identidade (TODO: texto real)
  beneficios: string[]    // 3–5 bullets (TODO: texto real)
  imagemHero: ImageMetadata   // TODO: foto real
  imagemCard: ImageMetadata   // TODO: foto real
  galeria: ImageMetadata[]    // TODO: fotos reais
}
```

Rota: `src/pages/modalidades/[slug].astro` → `getStaticPaths()` gera
`/modalidades/muay-thai`, etc. Link de cada card aponta para a rota amigável.

### 4.2 Produtos (loja catálogo — contato via WhatsApp)
**Sem checkout, sem backend, sem carrinho, sem validação de estoque.** O
catálogo mostra produtos e encaminha o interessado para o **WhatsApp** da
academia (link `https://wa.me/...` com mensagem pré-preenchida). Conteúdo em
`src/data/produtos.ts` tipado:

```ts
Produto = {
  id: string
  nome: string
  categoria: "camiseta" | "shorts" | "acessorio" | "equipamento"
  descricaoCurta: string
  imagem: ImageMetadata       // TODO: foto real
  disponivel: boolean         // default true até dado real
  whatsappMsg: string         // mensagem pré-preenchida p/ o WhatsApp da academia
}
```

> **Sem `preco` no schema** até que preços reais sejam fornecidos. Se a loja
> for exibir preço, o campo é adicionado depois, e só então o `Product` no
> JSON-LD (com `offers`) passa a ser emitido (ver seção 7.1).

Loja exibe grade de cards (3 col desktop / 1 col mobile) com CTA "Falar no
WhatsApp". **Sem carrinho, sem checkout, sem backend** — catálogo puro.

### 4.3 Galeria
`src/data/galeria.ts` lista imagens com `alt` descritivo, `evento`, `data`,
`aspectRatio` (declara o aspect para evitar layout shift). **Imagens a serem
fornecidas** — enquanto não houver, a galeria exibe placeholder explícito ou
fica vazia com aviso `TODO: imagens a fornecer`. `Lightbox` é componente Astro
com `<dialog>` nativo (sem `client:visible`).

### 4.4 Dados de Site
`src/data/site.ts` centraliza: nome, telefones, e-mail, endereço (para
LocalBusiness), horários, redes sociais, Google Maps embed URL, número de
WhatsApp da academia. **Todos os valores são placeholders marcados `TODO:`**
até serem fornecidos; a UI e o JSON-LD refletem apenas o que estiver preenchido
e visível.

### 4.5 Professor
Biografia, credenciais, foto e timeline ficam em `professor.astro` lendo dados
de `src/data/professor.ts` (tipado). **Nada inventado:** campos vazios/`TODO:`
até o conteúdo real ser fornecido. JSON-LD `Person` só é emitido quando houver
nome e dados reais visíveis.

### 4.6 Navegação
`src/data/nav.ts` — array tipado usado por Header/MobileNav/Footer. Única
fonte de verdade.

---

## 5. Rotas do Site

| URL | Arquivo | Conteúdo |
|------|------|------|
| `/` | `pages/index.astro` | Hero + modalidades + professor teaser + CTA |
| `/modalidades` | `pages/modalidades/index.astro` | Grade das 5 modalidades |
| `/modalidades/muay-thai` | `[slug].astro` (slug=muay-thai) | Página da modalidade |
| `/modalidades/boxe` | `[slug].astro` (slug=boxe) | Página da modalidade |
| `/modalidades/mma` | `[slug].astro` (slug=mma) | Página da modalidade |
| `/modalidades/luta-livre` | `[slug].astro` (slug=luta-livre) | Página da modalidade |
| `/modalidades/jiu-jitsu` | `[slug].astro` (slug=jiu-jitsu) | Página da modalidade |
| `/professor` | `pages/professor.astro` | Biografia + retrato + timeline |
| `/galeria` | `pages/galeria.astro` | Masonry + lightbox |
| `/loja` | `pages/loja.astro` | Catálogo de produtos |
| `/contato` | `pages/contato.astro` | Form + mapa + horários |
| `/404` | `pages/404.astro` | Página não encontrada |
| `/sitemap.xml` | `@astrojs/sitemap` | Gerado automaticamente |
| `/robots.txt` | `public/robots.txt` | estaticamente |

---

## 6. Etapas de Implementação

Cada etapa corresponde a **uma entrega funcional e verificável** (build verde).

1. **Bootstrap Astro + TS**
   `npm create astro@latest` (template minimal), TS strict, **sem Tailwind,
   sem React/Preact**. `@astrojs/sitemap`. Estrutura de pastas da seção 2.
2. **Tokens e base visual (CSS próprio)**
   `tokens.css` espelhando `design-system/MASTER.md`; `base.css` reset e base
   tipográfica; fonts self-hosted subset latin (Bebas Neue + Source Sans 3);
   `<Container>`, `<Section>`, `BaseLayout` só com `<slot/>`.
3. **Layout shell**
   `Header` desktop flutuante; `MobileNav` componente Astro + TS nativo
   (focus trap, Esc, progressive enhancement); `Footer`; `SeoMeta`. JSON-LD
   `LocalBusiness` só emitido quando `data/site.ts` tiver dados reais.
4. **Componentes UI (Astro + CSS escopado)**
   `Button`, `Card`, `Eyebrow`, `Icon`, `Photo` (aspect-ratio + alt
   obrigatórios).
5. **Conteúdo: modalidades (Markdown comum)**
   Schema Zod em `content/config.ts`; 5 arquivos `.md` com `TODO:` para texto
   e fotos reais; `modalidades/index.astro` + `[slug].astro`.
6. **Home**
   `HeroHome`, `ModalidadesGrid`, `ProfessorTeaser`, `CtaFinal`. Header não
   esconde conteúdo. Sinalizar `TODO` onde faltar dado real.
7. **Professor + Galeria**
   `professor.astro` lendo `data/professor.ts` (TODO). `galeria.astro` com
   masonry + `Lightbox` componente Astro usando `<dialog>` nativo (sem
   `client:visible`).
8. **Loja catálogo (WhatsApp)**
   `data/produtos.ts` (TODO); `loja.astro` com grade de cards e CTA "Falar no
   WhatsApp". Sem carrinho, sem checkout, sem backend.
9. **Contato**
   `ContatoForm` estático que funciona sem JS (action `mailto:` ou serviço
   simples sem backend proprietário); mapa; horários (TODO).
10. **SEO global + 404**
    `404.astro`; sitemap; `robots.txt`; Open Graph por página. JSON-LD por
    página **somente** para dados reais visíveis.
11. **Polimento a11y/perf**
    Auditoria Lighthouse, axe, revisão de foco, contraste, lazy loading,
    preload de fontes/hero. `prefers-reduced-motion` verificado.
12. **Deploy/entrega**
    Configurar build, hospedagem estática, domínio/SEO final.

---

## 7. SEO, Acessibilidade e Desempenho

### 7.1 SEO
- `<title>` único e ≤ 60 caracteres por página; `<meta description>` ≤ 155.
- `SeoMeta` injeta canonical, Open Graph (`og:image` real por página), Twitter
  `summary_large_image`.
- **Dados estruturados JSON-LD somente com dados reais e visíveis na página:**
  - `LocalBusiness` → emitido só se `data/site.ts` tiver nome, endereço e
    telefone reais.
  - `BreadcrumbList` → sempre que há hierarquia de navegação real.
  - `Person` (professor) → só se houver nome e dados reais visíveis.
  - `Product` (loja) → só se o `Produto` tiver `preco` real (campo hoje
    ausente); **não emitir `aggregateRating`, `review`, nem `offers` sem
    preço/veracidade** — nenhuma informação inventada.
  - `ImageGallery` → só quando as imagens reais existirem com `alt` descritivo.
  - **Nunca incluir avaliações, preços, etiquetas de horário "aberto" ou
    credenciais que não sejam reais e visíveis.**
- `sitemap.xml` automático; `robots.txt` permitindo tudo com sitemap referenciado.
- URLs amigáveis em pt-BR, lowercase, hífens. Sem query strings.
- `<html lang="pt-BR">`, headings hierárquicos sem pular níveis.

### 7.2 Acessibilidade
- HTML semântico: `<header>`, `<nav>`, `<main>`, `<article>`, `<section
  aria-labelledby>`, `<footer>`.
- Contraste WCAG AA: 4.5:1 corpo, 3:1 texto grande.
- Foco visível: `outline: 2px solid var(--color-red); outline-offset: 2px`.
- Urlschema/link: nunca só cor — sublinhado em links inline; ativo com ícone/borda.
- `<img alt>` descritivo; decorativas `alt=""`.
- Formulário: `<label>` explícito, `aria-required`, erros com `aria-describedby`,
  validação server-side tolerante (funciona sem JS).
- MobileNav: `aria-expanded`, `aria-controls`, esc fecha, foco armadilhado,
  `role="dialog"`, `aria-modal="true"`. Conteúdo da página permanece acessível
  (não é mascarado atrás do header fixo — `<main>` com `scroll-margin-top`).
- Lightbox: elemento **`<dialog>` nativo** (sem `client:visible`); `role="dialog"` e `Esc` são nativos; ainda assim garantir `aria-label` descritivo e navegação por teclado (Setas Próximo/Anterior).
- `prefers-reduced-motion: reduce` → todas as transições desligadas.
- Pular para conteúdo: link "Pular para o conteúdo" no topo, visível ao foco.

### 7.3 Desempenho
- Imagens: AVIF → WebP → JPG via `<Picture>`; `width`/`height` declarados;
  `loading="lazy"` e `decoding="async"` (exceto hero com `fetchpriority="high"`).
- Fontes self-hosted, `display=swap`, `preload` das críticas, subset latin,
  variável de peso quando disponível.
- CSS próprio escopado por componente (`<style>` do Astro); **sem Tailwind,
  sem purge**. CSS crítico mínimo inline no `<head>` do `BaseLayout`.
- **Sem ilhas reativas, sem `client:load`/`client:visible`.** Scripts nativos
  curtos (`<script>` do Astro) apenas para MobileNav e Lightbox.
- Build estático; cache HTTP longo para assets com hash.
- Alvos Lighthouse: Performance ≥ 90, Acessibilidade ≥ 95, SEO = 100.

---

## 8. Testes e Critérios de Aceite

### 8.1 Automatizados
- `astro check` — typecheck TypeScript válido.
- `npm run build` sem erros e sem warnings de imagem não otimizada.
- Lint: ESLint + Prettier (ou Biome) — sem erros.
- Teste de rotas (verificação simples via script de build ou ferramenta leve):
  todas as URLs da seção 5 respondem 200; 404 para rota inexistente.
- Verificação de `alt` em todas as `<img>` e de que nenhum JSON-LD inclui
  campos sem dado real (script build-time).

### 8.2 Manuais
- Responsivo: 375, 768, 1024, 1440px — sem scroll horizontal, conteúdo não
  escondido atrás de header.
- Contraste: verificado em modo claro e escuro alternado (Stark / browser devtools).
- Navegação por teclado por todo o site: Tab, Shift+Tab, Enter, Esc.
- Leitor de tela (NVDA/VoiceOver): estrutura de headings contígua, mobileNav
  announced como diálogo.
- `prefers-reduced-motion`: transições suprimidas.
- Formulário de contato submete sem JavaScript habilitado.

### 8.3 Critérios de aceite por página
- [ ] `<title>` e `<meta description>` únicos.
- [ ] Uma imagem hero com `fetchpriority="high"` e `alt` descritivo.
- [ ] Máximo 1 CTA vermelho por seção.
- [ ] Ritmo claro/escuro alternado (sem duas seções seguidas do mesmo tema salvo
  intenção justificada).
- [ ] Sem gradientes, blur, glow, animações de entrada.
- [ ] Dados ausentes sinalizados com `TODO:` visíveis — nada de conteúdo
  fabricado parecendo real.
- [ ] JSON-LD emitido apenas com dados reais visíveis na página (sem
  avaliações/preços/credenciais inventados).
- [ ] Lighthouse do documento final acima dos alvos (Perf ≥ 90, A11y ≥ 95,
  SEO = 100).

---

## 9. Estratégia de Commits

Princípio: **um commit = uma entrega funcional e verificável** (o build segue
verde, idealmente com `astro check` + `npm run build` passando após o commit).
**Não há contagem pré-fixada de commits;** uma etapa da seção 6 pode virar um
ou vários commits, conforme faça sentido como "entrega funcional".

### Convenção

- Mensagens no padrão **Conventional Commits**:
  `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`, `test:`, `perf:`,
  `a11y:`.
- Escopo técnico curto opcional: `feat(layout): add mobile nav drawer`.
- Idioma: livre, mantendo clareza.

### Sequência sugerida (uma por etapa da seção 6 — não obrigatória 1:1)

> A sequência abaixo é **orientativa**, alinhada às etapas da seção 6. O número
> real de commits por etapa é decisão do autor, desde que cada commit seja uma
> entrega funcional e verificável.

1. `chore: bootstrap astro + ts strict (no tailwind, no react)`
2. `feat: add design tokens and base styles from MASTER.md`
3. `feat: add base layout, container, section components`
4. `feat: add SEO meta (JSON-LD only when site data is real)`
5. `feat: add desktop header with active nav marker`
6. `feat: add mobile nav (native ts, focus trap, progressive enhancement)`
7. `feat: add footer reading site data`
8. `feat: add Button, Card, Eyebrow, Icon, Photo components`
9. `feat: add modalidades content schema (markdown) and 5 placeholders`
10. `feat: add modalidades index and [slug] page`
11. `feat: add home page sections`
12. `feat: add professor page (TODO placeholders)`
13. `feat: add galeria masonry + lightbox (native dialog)`
14. `feat: add loja catalogo (whatsapp cta, no checkout)`
15. `feat: add contato form (no-JS fallback) + mapa + horarios`
16. `feat: add 404 page, sitemap, robots`
17. `test: add build-time alt and json-ld sanity checks`
18. `perf: preload critical fonts and hero image`
19. `a11y: review focus order, contrast, reduced-motion`
20. `chore: configure deploy build`

### Regras adicionais
- **Nunca commitar segredos** (API keys, tokens); usar `.env` e `.env.example`.
- Cada commit deve estar com `astro check` e `npm run build` passando.
- **Nunca commitar conteúdo fabricado parecendo real** — dados ausentes ficam
  como `TODO:` visíveis e podem entrar em commits ("feat: add ... placeholders").
- PR por etapa conclusiva (ex.: "Home completa", "Modalidades completas").
- Branch nome: `feat/[pagina-ou-tema]`, `fix/[problema]`, `chore/[tarefa]`.
