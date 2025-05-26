This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API routes
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
  [http://localhost:3000/api/hello](http://localhost:3000/api/hello).
  This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as
[API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
API routes provide a solution to build a public API with Next.js.
Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page.
They are server-side only bundles and won't increase your client-side bundle size.

## deploy on Fly.io

$ fly launch
or
$ fly deploy

view at: 
  https://literumado.fly.dev/



## Deploy on Vercel

dashboard:
  https://vercel.com/zmilas-projects/literumado

view at: 
  https://literumado.vercel.app/


## todo
- [ ] (med) en dekduuma konvertilo aldonu bildon kun miaj variantoj de la kaktovikaj manskribitaj ciferoj
- [ ] (min) en dekduuma konvertilo faru eblecon transformi nombron al teksto (kaj 10 kaj 12)
- [ ] (med) kreu bel-ŝav konvertilon
- [ ] provu WebComponents (htmx/alpinejs) anstataŭ React


## historio:
  as api json [.../api/historio] or public static paĝe [.../historio.json]


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

