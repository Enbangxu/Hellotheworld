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
