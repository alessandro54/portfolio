# Repository Guidelines

## Project Structure

This pnpm workspace contains two apps under `apps/`: `web/` is the Astro portfolio, with pages, components, sections, styles, scripts, and public assets in `apps/web/src/` and `apps/web/public/`; `studio/` is the Sanity CMS, with schemas in `apps/studio/schemaTypes/`. Shared workspace configuration and commands live at the repository root. No test suites are currently configured.

## Development and Build Commands

Run commands from the repository root with Node.js 22.12+ and pnpm 10.28:

- `pnpm install` installs workspace dependencies.
- `pnpm dev` starts the web and Studio development servers through Turborepo.
- `pnpm build` builds both apps; the web build also minifies HTML, subsets fonts, and checks performance budgets.
- `pnpm preview` starts the configured production preview tasks.
- `pnpm lint` runs Biome checks; `pnpm lint:fix` applies safe fixes and formatting.
- `pnpm format` formats supported files with Biome.
- `pnpm sanity:deploy` and `pnpm sanity:schema:deploy` deploy the Studio and its schema.

## Style and Naming

Follow existing Astro and TypeScript patterns. Keep UI in focused `.astro` components and sections; keep browser behavior in `apps/web/src/scripts/`. Use descriptive PascalCase component filenames, camelCase TypeScript modules, and match existing Sanity schema naming. Root Biome configuration is the source of truth for formatting and lint; the Studio also uses its Sanity ESLint config. Prefer small changes that preserve the site's performance budgets and accessible behavior.

## Content and Localization

The site supports English and Spanish: keep static UI copy in `apps/web/src/i18n/translations.ts` and localized CMS fields in the existing Sanity field shape. Singleton schemas use fixed `singleton-<type>` document IDs configured in `apps/studio/sanity.config.ts`; preserve those IDs and query conventions when changing singleton content. Web path aliases are defined in `apps/web/tsconfig.json`.

## Validation

There is no automated test command or coverage threshold. For web or shared changes, run `pnpm lint` and `pnpm build`. For Studio schema changes, run the build and, when deploying, `pnpm sanity:schema:deploy`. Check affected pages in a browser when changing layout, interaction, or responsive behavior.

## Commits and Pull Requests

Use the observed Conventional Commit style, such as `feat: improve project cards` or `fix: correct locale routing`. Keep each commit focused. Pull requests should describe the user-visible change, list validation commands and results, link related issues when applicable, and include screenshots for visual changes. Mention required environment or Sanity schema changes explicitly.

## Configuration and Secrets

Copy `apps/web/.env.example` to `apps/web/.env` for local Sanity project and dataset settings. Do not commit `.env` files, credentials, or deployment tokens. Production deployment credentials are managed through GitHub Actions environment secrets and variables.
