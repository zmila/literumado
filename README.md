This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API routes
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
  [http://localhost:3000/api/hello](http://localhost:3000/api/hello).
  This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as
[API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
API routes provide a solution to build a public API with Next.js.
Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page.
They are server-side only bundles and won't increase your client-side bundle size.

# deploy on Fly.io

$ fly launch
or
$ fly deploy

view at: 
  https://literumado.fly.dev/


# Deploy on Vercel

❌  failed to login, forgot password/email!

dashboard:
  https://vercel.com/zmilas-projects/literumado

view at: 
  https://literumado.vercel.app/


# todo
- [ ] (maj) dinu kevako: vidu progreson en src/pages/dinu_kevako/README.md
- [ ] (med) en dekduuma konvertilo aldonu bildon kun miaj variantoj de la kaktovikaj manskribitaj ciferoj
- [ ] (med) kreu bel-ŝav konvertilon
- [ ] (med) kopiu eo-bali konvertilon
- [ ] (med) kopiu eo-lontara konvertilon
- [ ] (min) katalogo de skribiloj
- [ ] (min) provu WebComponents (htmx/alpinejs) anstataŭ React


# historio:
  as api json [.../api/historio] or public static paĝe [.../historio.json]

- 0.10.1 [2026-09-05] Vojago: added UI to select a tile (instead of input field) WIP
- 0.10.0 [2026-09-05] HexTruchet: new option Codes, to show mapping code<->tile
- 0.9.4 [2026-06-22] refactoring to extract common svg fragments. add ligatures JN and DZ
- 0.9.3 [2026-06-22] tria versio: farita "zoom" (mal)pligrandigo de svg-bildoj, kaj suporto de \n por komenci novan vicon
- 0.9.2 [2026-04-21] dua versio: ĉiuj literoj havas sian svg-bildon, kaj ili sukcese aperas vertikale en silaboj KV kaj KVK (sed ne KKV aŭ KVKK)
- 0.9.1 [2026-04-21] unua versio kun defaulta aranĝo de silaboj vertikale kaj de vortoj en vicoj
- 0.9.0 [2026-04-20] komenco de `Dinu Kevako`, nun pretas divido je silaboj
- 0.8.0 [2026-04-03] 
  Aldonis prononcilojn en Esperanto (Dekuma/Dudekuma) kun subteno por negativaj nombrojn.
- 0.7.1 [2025-05-26] 
  update js libraries to newest:
    > npm i next@latest react@latest react-dom@latest eslint-config-next@latest

- 0.7.0 [2025-05-26] Aldonis konvertilon inter Dekuma <-> Ekvilibra nombrosistemoj
- 0.6.1 [2024-12-18] Laborante pri ludo 'Vojago': farita seslatera ludejo
- 0.6 [2024-12-18] La kaheloj estas re-orientitaj, nun ili estas pintaj supre
- 0.5.2 [2024-12-17] Farita por Esperanto
- 0.5.1 [2024-12-17] Farita Hex Truchet por la angla
- 0.5 [2024-12-15] Aldono de Hex Truchet (komenco), kaj de grupigo por kradoj 3x3
- 0.4 [2024-12-06] Aldonis nomon de tago en semajno, kaj demon de krado 3x3
- 0.3 [2024-10-10] Aldonis paĝaranĝon, kun supra ligilo reen al indekso.
- 0.2 [2024-10-08] Aldonis historion. Farita konvertilo Esperanto<->Ŝava
- 0.1 [2024-10-05] Unua versio. Farita konvertilo Dekuma<->Dekduuma


# install
  npm install

# dependencies:

## Main Dependencies
- **next**: A React framework for building full-stack web applications.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.

## Development Dependencies
- **@flydotio/dockerfile**: Generates a Dockerfile for deploying Next.js apps on Fly.io.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **@vitest/ui**: The UI for Vitest, a testing framework.
- **eslint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **eslint-config-next**: ESLint configuration for Next.js projects.
- **tailwindcss**: A utility-first CSS framework for rapid UI development.
- **typescript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **vitest**: A fast and simple testing framework.

## Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.

To run the tests, use the following command:

```bash
npm test
```

This will run all the test files ending with `.test.ts` or `.test.tsx` in the `src` directory. You can also run tests in watch mode, which is useful during development:

```bash
npm test -- --watch
```


## Python Jupyter Notebooks

```bash
> python -m pip install numpy
```