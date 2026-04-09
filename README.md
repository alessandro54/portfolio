# Personal Portfolio

![Performance](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/alessandro54/3b29f6a6f915c0fc5c8582fe9a0dd35b/raw/lighthouse_performance.json)
![Accessibility](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/alessandro54/3b29f6a6f915c0fc5c8582fe9a0dd35b/raw/lighthouse_accessibility.json)
![Best Practices](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/alessandro54/3b29f6a6f915c0fc5c8582fe9a0dd35b/raw/lighthouse_best_practices.json)
![SEO](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/alessandro54/3b29f6a6f915c0fc5c8582fe9a0dd35b/raw/lighthouse_seo.json)
![Page Weight](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/alessandro54/3b29f6a6f915c0fc5c8582fe9a0dd35b/raw/lighthouse_page_size.json)

Personal portfolio — engineered for performance. Page weight badge includes ~11 KiB of Cloudflare analytics injected at the edge — first-party code is **~32 KB Brotli** on the wire.

WebGL dot grid, scroll animations, parallax, i18n, dark/light themes, CMS-managed content. Zero animation libraries. Zero frameworks at runtime.

Live at [alessandro.chumpitaz.dev](https://alessandro.chumpitaz.dev).

## Why this exists

Most portfolios are template drops. This one is an engineering statement.

The goal was to build something visually rich — WebGL background, scroll-driven animations, parallax, dark/light themes — and deliver it in under 35 KB. Not because anyone asked for it, but because constraints reveal craft.

Every byte is intentional. GSAP was replaced with native Web Animations API. Fonts are auto-subset at build time to only the characters on the page, with weight axes trimmed to headings only. Body text renders in system-ui at zero cost. The WebGL dot grid is hand-written — no Three.js, no libraries. The entire animation layer is 1.9 KB.

Performance isn't an afterthought here. Lighthouse CI runs on every deploy with hard budgets. If a commit adds a heavy dependency or breaks a metric, the pipeline fails. The badges at the top of this README update automatically from live audit results.

The median webpage in 2026 is 2.5 MB. This site is 32 KB — and it has more going on than most of them.

## Stack

- **Frontend** — Astro v6, Tailwind CSS v4, TypeScript
- **CMS** — Sanity v5 (Studio + hosted dataset)
- **Animations** — Web Animations API + IntersectionObserver (zero dependencies)
- **Background** — Custom WebGL dot grid (~2.5 KB gzip)
- **Fonts** — Plus Jakarta Sans, auto-subset at build time
- **Monorepo** — pnpm workspaces + Turborepo
- **Deploy** — Cloudflare Pages via GitHub Actions
- **Perf gates** — Lighthouse CI on every deploy, fails on regression

## Performance

| Metric | Value |
|---|---|
| Total transfer | ~32 KB (Brotli) |
| FCP | 0.5s |
| LCP | 0.6s |
| TBT | 0ms |
| CLS | 0 |
| JS total | 7 KB gzip |
| Render-blocking JS | None (deferred via `requestIdleCallback`) |

Build pipeline: Astro build, HTML minification, font subsetting, performance budget check. Lighthouse audits enforced in CI.

## Structure

```
apps/
  web/      Astro static site (~37 KB Brotli transfer)
  studio/   Sanity CMS studio
```

## Commands

All commands run from the **root**:

| Command | Action |
|---|---|
| `pnpm dev` | Start web + studio dev servers |
| `pnpm build` | Production build (includes optimization pipeline) |
| `pnpm preview` | Preview production build locally |
| `pnpm sanity:deploy` | Deploy Sanity Studio |
| `pnpm sanity:schema:deploy` | Deploy schema updates |

Web runs at `localhost:4321`, Studio at `localhost:3333`.

## Environment Variables

Create `apps/web/.env` from `apps/web/.env.example`:

```
PUBLIC_SANITY_PROJECT_ID=sczvled1
PUBLIC_SANITY_DATASET=production
```

## Deployment

Pushes to `main` trigger the GitHub Actions pipeline: build, deploy to Cloudflare Pages, then Lighthouse audit with budget enforcement. Secrets required in the `production` GitHub environment:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `vars.PUBLIC_SANITY_PROJECT_ID`
- `vars.PUBLIC_SANITY_DATASET`
- `vars.LIGHTHOUSE_GIST_ID`
- `GIST_TOKEN`
