# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built as a **pnpm monorepo** with **Turborepo**. Two apps:

- `apps/web` — Astro v6 frontend with Tailwind CSS v4 and a Three.js interactive dot-grid background
- `apps/studio` — Sanity v5 CMS studio (React 19) for managing portfolio content

## Commands

All commands run from the **root directory**:

| Command | Action |
|---|---|
| `pnpm dev` | Start both Studio and Web dev servers (via turbo) |
| `pnpm build` | Production build for both apps |
| `pnpm preview` | Preview production build locally |
| `pnpm sanity:deploy` | Deploy Sanity Studio |
| `pnpm sanity:schema:deploy` | Deploy schema updates |

Web dev server runs at `localhost:4321`. No test framework is configured.

## Architecture

**Monorepo:** pnpm workspaces (`pnpm-workspace.yaml`) + Turborepo (`turbo.json`) orchestrate builds across apps. Always use `pnpm`, never npm/yarn.

**Three.js scene** (`apps/web/src/scripts/scene.ts`): Custom 70×42 dot grid with spring physics, mouse-push interaction, scroll-triggered camera transitions, and wave morphing. Three.js is loaded via CDN (global `THREE`), not as an npm dependency.

**Sanity schemas** (`apps/studio/schemaTypes/`): project, experience, post, about (singleton), recentWork. Content is intended to be fetched via `@sanity/client` but is currently hardcoded in `index.astro`.

**Sanity config:** Project ID `sczvled1`, dataset `production`.

**Theming:** Dark/light mode via `data-theme` attribute on `<html>`, stored in localStorage. CSS custom properties defined in `apps/web/src/styles/global.css`.

**Tailwind CSS v4:** Configured via `@tailwindcss/vite` plugin in `apps/web/astro.config.mjs`.

## Key Constraints

- **Node.js >= 22.12.0**, **pnpm >= 10.28.0** (enforced in root `package.json`)
- TypeScript strict mode for the web app (extends `astro/tsconfigs/strict`)
