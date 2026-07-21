# PROJECT_AUDIT.md — enbang.online v4 Readiness Audit

Date: 2026-07-21
Repository: Enbangxu/Hellotheworld

## Package and scripts

- Package manager: npm with `package-lock.json` committed.
- Framework dependencies: Next.js 15, React 19, TypeScript 5, Tailwind CSS 3, ESLint 9.
- Runtime scripts:
  - `npm run dev` starts Next.js development server.
  - `npm run build` creates the production build.
  - `npm run start` serves the production app.
  - `npm run lint` runs ESLint over the repository.

## Framework

- The app uses the Next.js App Router under `src/app`.
- React components live under `src/components`.
- Static typed data lives under `src/data` and `src/config`.
- Styling is Tailwind-first with global CSS in `src/styles/globals.css`.

## Routing

- Root routes redirect to locale-prefixed routes through `middleware.ts`.
- Existing locale route structure is `src/app/[locale]`.
- Current public modules before this upgrade: home, AI Lab, AI Tools, and Global Creator.
- Locale detection previously supported English and Chinese; v4 expands this to English, Chinese, and Japanese.

## Components

- Existing reusable UI includes `Navbar`, `Hero`, `SectionCard`, `GlassCard`, and `FloatingBlobs`.
- Ecosystem pages share `EcosystemPageShell`.
- Tool filtering is handled by `ToolsExplorer` as a client component.
- v4 should preserve this component model and add focused components instead of rewriting the whole project.

## Styles

- Tailwind CSS is configured through `tailwind.config.ts`.
- The visual system uses gradients, glassmorphism cards, rounded containers, and responsive grids.
- Global animation and theme support are centralized in `src/styles/globals.css`.

## Deployment

- The project is compatible with Vercel-style Next.js deployment.
- `NEXT_PUBLIC_SITE_URL` is configured via `src/config/site.ts`, with a production fallback.
- SEO support exists through App Router metadata, sitemap, and robots files.

## Environment

- `.env.example` exists for documenting environment variables.
- Current implementation is static/data-driven and does not require a server-side secret.
- Future AI Assistant integration should introduce server-only variables such as `OPENAI_API_KEY`, vector database URLs, and RAG index identifiers without exposing secrets to the client.

## Upgrade constraints

- Do not delete existing functionality.
- Do not rewrite the entire project.
- Modify only files required for the AI Studio v4 upgrade.
