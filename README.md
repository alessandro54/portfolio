# Alessandro Chumpitaz — Portfolio

Personal portfolio website. Live at [alessandro.chumpitaz.dev](https://alessandro.chumpitaz.dev).

## Stack

- **Frontend** — Astro v6, Tailwind CSS v4, Three.js (CDN), GSAP
- **CMS** — Sanity v5 (Studio + hosted dataset)
- **Monorepo** — pnpm workspaces + Turborepo
- **Deployment** — Cloudflare Pages via GitHub Actions

## Structure

```
/
├── apps/
│   ├── web/          # Astro frontend
│   └── studio/       # Sanity Studio
├── .github/
│   └── workflows/
│       └── deploy.yml
└── package.json
```

## Commands

All commands run from the **root**:

| Command | Action |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start web + studio dev servers |
| `pnpm build` | Production build |
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

Pushes to `main` trigger the GitHub Actions pipeline which builds and deploys to Cloudflare Pages. Secrets required in the `production` GitHub environment:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `vars.PUBLIC_SANITY_PROJECT_ID`
- `vars.PUBLIC_SANITY_DATASET`
