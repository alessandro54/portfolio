# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built as a **pnpm monorepo** with **Turborepo**. Two apps:

- `apps/web` — Astro v6 frontend with Tailwind CSS v4 and a Three.js interactive dot-grid background
- `apps/studio` — Sanity v5 CMS studio (React 19) for managing portfolio content

Live at [alessandro.chumpitaz.dev](https://alessandro.chumpitaz.dev).

## Commands

All commands run from the **root directory**:

| Command | Action |
|---|---|
| `pnpm dev` | Start both Studio and Web dev servers (via turbo) |
| `pnpm build` | Production build for both apps |
| `pnpm preview` | Preview production build locally |
| `pnpm sanity:deploy` | Deploy Sanity Studio |
| `pnpm sanity:schema:deploy` | Deploy schema updates |

Web dev server runs at `localhost:4321`, Studio at `localhost:3333`. No test framework is configured.

## Architecture

**Monorepo:** pnpm workspaces (`pnpm-workspace.yaml`) + Turborepo (`turbo.json`) orchestrate builds across apps. Always use `pnpm`, never npm/yarn.

**Three.js scene** (`apps/web/src/scripts/scene.ts`): Custom 70×42 dot grid with spring physics, mouse-push interaction, scroll-triggered camera transitions, and wave morphing. Three.js is loaded via CDN (global `THREE`), not as an npm dependency.

**Sanity config:** Project ID `sczvled1`, dataset `production`. Client reads from env vars `PUBLIC_SANITY_PROJECT_ID` / `PUBLIC_SANITY_DATASET` with hardcoded fallbacks (`apps/web/src/lib/sanity.ts`).

**Sanity schemas** (`apps/studio/schemaTypes/`):

| Schema | Type | Pattern |
|---|---|---|
| `hero` | Singleton | `_id: singleton-hero` |
| `ticker` | Singleton | `_id: singleton-ticker` |
| `whatIDo` | Singleton | `_id: singleton-whatIDo` |
| `whyMe` | Singleton | `_id: singleton-whyMe` |
| `selectedProjects` | Singleton | `_id: singleton-selectedProjects` |
| `experience` | Multi-document | ordered by `startDate desc` |
| `project` | Multi-document | — |
| `post` | Multi-document | — |
| `recentWork` | Multi-document | — |

**Singleton pattern:** Schema has `__experimental_actions: ['update', 'publish']`. Studio structure in `sanity.config.ts` maps each singleton to a fixed `documentId` (`singleton-<type>`). GROQ queries use `*[_id == "singleton-<type>"][0]`.

**i18n:** Supported locales: `en`, `es`. Static UI strings live in `apps/web/src/i18n/translations.ts` via `useTranslations(locale)`. Sanity content uses locale objects `{ en: '...', es: '...' }` resolved by a `t(field)` helper in each section.

**Theming:** Dark/light mode via `data-theme` attribute on `<html>`, stored in localStorage. CSS custom properties defined in `apps/web/src/styles/global.css`.

**Tailwind CSS v4:** Configured via `@tailwindcss/vite` plugin in `apps/web/astro.config.mjs`.

**Animations:** GSAP + ScrollTrigger (`apps/web/src/scripts/animations.ts`). Elements listed in `apps/web/src/styles/global.css` start `visibility: hidden` and are revealed by scroll triggers. `#contact` is excluded from the section parallax animation.

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `main` and deploys to Cloudflare Pages via `wrangler-action`. Uses the `production` GitHub environment.

## Path Aliases (web app)

| Alias | Path |
|---|---|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@sections/*` | `src/sections/*` |
| `@lib/*` | `src/lib/*` |
| `@layouts/*` | `src/layouts/*` |
| `@i18n/*` | `src/i18n/*` |

## Key Constraints

- **Node.js >= 22.12.0**, **pnpm >= 10.28.0** (enforced in root `package.json`)
- TypeScript strict mode for the web app (extends `astro/tsconfigs/strict`)
- Never use `deploy_schema` MCP tool — local studio files exist, always deploy via `pnpm sanity:schema:deploy`
