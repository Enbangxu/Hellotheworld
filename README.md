# Hello the World

Hello the World is a production-ready website foundation built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**. Version 3 upgrades the original landing page into a bilingual, SEO-ready, deployment-friendly site that can grow into a portfolio, product page, travel journal, or personal brand hub.

## Project Overview

The site includes:

- English and Chinese experiences with clean `/en` and `/zh` URLs
- Browser language detection that redirects first-time visitors to the best locale
- Next.js Metadata API configuration with canonical alternates, Open Graph, and Twitter card metadata
- Generated `sitemap.xml` and `robots.txt`
- Smooth page motion, scroll reveal sections, animated gradients, and interactive cards
- Dark mode UI controls and a bilingual language switcher
- CI workflow that installs dependencies, runs lint, and verifies the production build

## Architecture

```text
src/
├── app/          # Next.js App Router layouts, locale pages, sitemap, and robots routes
├── components/   # Reusable UI components and client-side interactions
├── config/       # Site-wide constants such as supported locales and public URL
├── data/         # Static bilingual content used by the UI and metadata
├── lib/          # Shared helpers, including locale utilities
└── styles/       # Global Tailwind CSS and custom animation styles
```

Key files:

- `src/data/site.ts` stores static website copy, navigation labels, section content, and locale metadata.
- `middleware.ts` detects browser language and redirects `/` to `/en` or `/zh` while preserving clean locale URLs.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate search-engine discovery files.
- `.github/workflows/ci.yml` validates every push and pull request with lint and build checks.

## Local Development

Install dependencies:

```bash
npm install
```

Create local environment variables:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The middleware redirects to the browser-preferred locale. You can also open [http://localhost:3000/en](http://localhost:3000/en) or [http://localhost:3000/zh](http://localhost:3000/zh) directly.

Run quality checks before shipping changes:

```bash
npm run lint
npm run build
```

## Vercel Deployment Guide

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Keep the default Next.js framework preset.
4. Add `NEXT_PUBLIC_SITE_URL` in Vercel project environment variables, using the production domain.
5. Deploy the project.
6. After deployment, verify `/en`, `/zh`, `/sitemap.xml`, and `/robots.txt`.

## CI/CD

GitHub Actions runs on pushes to `main` and `feature/**` branches and on pull requests targeting `main`. The workflow uses Node.js 22, installs dependencies with `npm ci`, runs `npm run lint`, and runs `npm run build`.


## V20 AI Minimal Experience

V20 focuses the homepage on the shortest path from an idea to an AI-powered experience while preserving the complete DeepSeek creative workflow, AI Studio, community, V19 knowledge graph, SEO, internationalization, and Vercel deployment architecture on their dedicated routes.

- **Minimal homepage:** a compact hero and three clear core destinations replace repeated introductions and feature grids.
- **AI entry system:** the new `AIEntry` offers direct Learn, Create, and Explore paths in Chinese, English, and Japanese.
- **Mobile optimization:** a thumb-friendly bottom navigation keeps Home, AI, Studio, Community, and Profile one tap away.
- **Performance improvements:** the homepage is server-rendered, avoids Framer Motion and unnecessary client state, and ships without below-the-fold showcase sections.

## V13 DeepSeek AI Creative Lab

V13 upgrades `/create` from a single-output generator into a complete co-creation loop: category-led idea composition, a four-stage generation journey, safe structured results, full-result refinement, ten local versions, Markdown/JSON exports, feedback, and opt-in sharing. The experience supports Chinese, English, and Japanese without requiring sign-in.

### Local development and DeepSeek

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configure `DEEPSEEK_API_KEY` only as a server environment variable. The default endpoint is `https://api.deepseek.com`, the default model is `deepseek-v4-flash`, and `DEEPSEEK_PREMIUM_MODEL` is used only for the explicit high-quality rebuild action. Never prefix the key with a public-browser environment prefix. `AI_DEMO_MODE=true` enables deterministic local/demo responses; development also falls back to a clearly labelled demo when no key is configured. Production without a key and without demo mode returns `CONFIGURATION_REQUIRED` while the rest of the site remains available. Existing `AI_API_URL`, `AI_API_KEY`, and `AI_MODEL` continue to power the legacy chat route.

### Database and sharing

Run `npx prisma generate` after installing dependencies. Review the generated V13 migration and deploy it to production only through a controlled process (`npx prisma migrate deploy`) against the intended database. Never connect an unknown database from a development or automation environment. Public sharing is opt-in, uses an unpredictable slug, and hashes the one-time anonymous owner token. When the database is unavailable the client creates a strictly sized, hash-only portable preview containing selected public work fields; generation and local versioning remain operational.

### Privacy, safety, rate limits, and cost

DeepSeek calls run exclusively through server routes. Keys, authorization headers, full prompts, full model output, session identifiers, and owner tokens are excluded from analytics and exports. Requests have input/body/context limits, timeouts, request-id deduplication, a bounded retry, and a configurable anonymous daily limit. The bundled in-memory limiter is a single-instance fallback; production should attach a distributed adapter before multi-region scale. Public creation is always an explicit user choice.

### Testing and Vercel deployment

```bash
npm run typecheck
npm run test
npm run check-build
npm run lint
npm run build
```

In Vercel, configure `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL`, `DEEPSEEK_MODEL`, optional `DEEPSEEK_PREMIUM_MODEL`, `AI_DEMO_MODE`, `CREATION_SHARE_SECRET`, `CREATIVE_DAILY_ANONYMOUS_LIMIT`, `DATABASE_URL`, and `NEXT_PUBLIC_SITE_URL`. Confirm values separately for Development, Preview, and Production, and redeploy after changes. Do not place a real key in source, logs, screenshots, README content, or pull requests. Confirm the controlled production migration, distributed rate limiting, and real load/security testing before broad rollout.
