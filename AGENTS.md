# AGENTS.md — Literumado

## Project Overview
**Literumado** is a Next.js (Pages Router) app providing linguistic and numeric conversion tools, primarily for **Esperanto**. The UI language and variable/function names are in Esperanto. The app is deployed on [Fly.io](https://literumado.fly.dev/).

## Developer Workflows
```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm test          # Run Vitest unit tests (files: src/utils/*.test.ts)
npm test -- --watch  # Watch mode
npm run lint      # ESLint
fly deploy        # Deploy to Fly.io
```

## Architecture
- **Next.js Pages Router** (`src/pages/`) — each subdirectory is a route (e.g., `/dekduuma`, `/dinu_kevako`, `/sxava`, `/ekvilibra`, `/hextruchet`, `/vojago`, `/krado33`)
- **Business logic** lives exclusively in `src/utils/` as plain TypeScript classes — completely decoupled from React
- **Pages** instantiate util classes directly (no global state, no context, no Redux)
- **`Layout` component** (`src/components/Layout.tsx`) wraps all sub-pages; it provides the "al indekso" back-link header — always wrap new pages with `<Layout>`
- **`_app.tsx`** applies global styles; **`_document.tsx`** customises the HTML document

### Subdirectory pattern (for complex features)
When a feature grows beyond a single util class, group all its files in a named subdirectory:
```
src/utils/<feature>/
    tipoj.ts          — shared TypeScript types only (no logic)
    konstantoj.ts     — all numeric constants and colours (single source of truth)
    <Feature>Konvertilo.ts   — business logic / text processing
    <Feature>Layout.tsx      — SVG layout calculations, returns ReactElement[]
    <Feature>Svg.tsx         — low-level glyph factories (optional)

src/components/<feature>/
    <Feature>SvgComponent.tsx  — React SVG component: background, grid, renders glyphs

src/pages/<feature>/
    index.tsx         — page: user input + instantiates util classes
    README.md         — architecture notes in Esperanto
```
`dinu_kevako` is the reference implementation of this pattern.

## Naming Conventions (Esperanto)
All source identifiers use Esperanto words:
- `Konvertilo` = converter, `Prononcilo` = pronouncer, `Silabo` = syllable, `Vorto` = word
- `tipoj` = types, `konstantoj` = constants, `Layout` = layout (loanword)
- `montru*` = display/render, `dividu*` = split, `formatigi` = format, `arangi` = arrange
- File names follow `PascalCase` matching the class name: `DekduumaKonvertilo.ts`

## Utility Pattern
Each tool is a class in `src/utils/`. Example:
```ts
// src/utils/DinuKevakoKonvertilo.ts
export class DinuKevakoKonvertilo {
    dividuJeSilaboj(teksto: string): Vorto[] { ... }
    formatigi(vortoj: Vorto[]): string { ... }
}
```
Pages instantiate inline (no DI): `const dkk = new DinuKevakoKonvertilo();`

For SVG-rendering features, a separate layout class returns `ReactElement[]`:
```ts
// src/utils/dinu_kevako/DinuKevakoLayout.tsx
export class DinuKevakoLayout {
    arangi(vortoj: Vorto[], agordoj: ArangiAgordoj): React.ReactElement[] { ... }
}
```

## Testing
- Tests live alongside utils: `src/utils/*.test.ts`
- Framework: **Vitest** (config: `vitest.config.mts`)
- Only util classes are tested; no component/page tests exist currently

## Static & Server Assets
- `public/historio.json` — version history, also exposed via `src/pages/api/historio.ts`
- `public/server-side/grids/` — pre-generated SVG grids for `krado33`, created by `server-side/generate_grid33_svg_files.js`
- `public/hextruchet/` — static HTML about pages for Hex Truchet feature

## Key Files
| Path                                              | Purpose                                                        |
|---------------------------------------------------|----------------------------------------------------------------|
| `src/pages/index.tsx`                             | Home page with tool directory & today's date in Esperanto      |
| `src/components/Layout.tsx`                       | Shared page shell (header + back-link)                         |
| `src/utils/DekduumaKonvertilo.ts`                 | Decimal ↔ Duodecimal + Kaktovik numerals                       |
| `src/utils/SxavaKonvertilo.ts`                    | Esperanto ↔ Shavian alphabet                                   |
| `src/utils/EkvilibraKonvertilo.ts`                | Balanced numeral system converter                              |
| `src/utils/Prononcilo10.ts` / `Prononcilo12.ts`   | Esperanto number pronunciation                                 |
| `src/utils/dinu_kevako/tipoj.ts`                  | Shared types: `Silabo`, `Vorto`                                |
| `src/utils/dinu_kevako/konstantoj.ts`             | All dimensions, spacings, colours for Dinu Kevako              |
| `src/utils/dinu_kevako/DinuKevakoKonvertilo.ts`   | Esperanto syllabification for Dinu Kevako script               |
| `src/utils/dinu_kevako/DinuKevakoLayout.tsx`      | Glyph positioning: k/v/f stacking + line-wrap layout           |
| `src/components/dinu_kevako/DinuKevakoSvgComponent.tsx` | SVG render: parchment bg, structural grid, glyphs        |
| `src/pages/dinu_kevako/index.tsx`                 | Dinu Kevako page: text input → syllabification → SVG           |
| `src/pages/dinu_kevako/README.md`                 | Architecture notes & TODO for Dinu Kevako (in Esperanto)       |
