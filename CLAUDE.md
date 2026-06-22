# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at http://localhost:3000 (uses Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm test             # Run Vitest unit tests
npm test -- --watch  # Watch mode
npm test -- <path>   # Run a single test file, e.g. npm test -- src/utils/DekduumaKonvertilo.test.ts
fly deploy           # Deploy to https://literumado.fly.dev/
```

## Project Overview

**Literumado** is a Next.js (Pages Router) app with linguistic and numeric conversion tools for **Esperanto**. UI language and all source identifiers are in Esperanto.

## Architecture

- **Pages** (`src/pages/`) — each subdirectory is a route: `/dekduuma`, `/ekvilibra`, `/sxava`, `/dinu_kevako`, `/hextruchet`, `/vojago`, `/krado33`
- **Business logic** lives exclusively in `src/utils/` as plain TypeScript classes, fully decoupled from React
- **Pages** instantiate util classes inline with no global state, no context, no Redux: `const dkk = new DinuKevakoKonvertilo();`
- **`Layout` component** (`src/components/Layout.tsx`) wraps all sub-pages and provides the "al indekso" back-link — always wrap new pages with `<Layout>`

### Subdirectory pattern for complex features

When a feature grows beyond a single util class, use the `dinu_kevako` feature as the reference implementation:

```
src/utils/<feature>/
    tipoj.ts                       — shared TypeScript types only (no logic)
    konstantoj.ts                  — all numeric constants and colours (single source of truth)
    <Feature>Konvertilo.ts         — business logic / text processing
    <Feature>Layout.tsx            — SVG layout calculations, returns ReactElement[]
    <Feature>Svg.tsx               — low-level glyph factories (optional)

src/components/<feature>/
    <Feature>SvgComponent.tsx      — React SVG component: background, grid, renders glyphs

src/pages/<feature>/
    index.tsx                      — page: user input + instantiates util classes
    README.md                      — architecture notes in Esperanto
```

### Static assets

- `public/historio.json` — version history, exposed via `src/pages/api/historio.ts`
- `public/server-side/grids/` — pre-generated SVG grids for `krado33`, created by `server-side/generate_grid33_svg_files.js`

## Naming Conventions (Esperanto)

All source identifiers use Esperanto words:
- `Konvertilo` = converter, `Prononcilo` = pronouncer, `Silabo` = syllable, `Vorto` = word
- `tipoj` = types, `konstantoj` = constants
- `montru*` = display/render, `dividu*` = split, `formatigi` = format, `arangi` = arrange
- File names follow `PascalCase` matching the class name: `DekduumaKonvertilo.ts`

## Testing

Tests live alongside utils (`src/utils/*.test.ts`). Only util classes are tested — no component or page tests exist. Framework is Vitest (config: `vitest.config.mts`), running in `node` environment.
