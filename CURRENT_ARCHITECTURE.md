# Current Architecture — Hello the world

## Package and runtime
- Next.js 15 app-router application with React 19 and TypeScript.
- Styling is Tailwind CSS 3 with global utilities in `src/styles/globals.css`.
- UI motion currently uses Framer Motion and icons use Lucide React.
- Scripts: `npm run dev`, `npm run build`, `npm run start`, and `npm run lint`.

## App directory
- `src/app/layout.tsx` defines global metadata, OpenGraph/Twitter metadata, and imports global CSS.
- `src/app/page.tsx` redirects to the default locale from `src/config/site.ts`.
- Localized routes live under `src/app/[locale]`, including home, agents, marketplace, dashboard, creator profile, community/feed, workspace, lab, tools, knowledge, assistant, changelog, and level pages.
- Top-level compatibility redirects exist for `/dashboard`, `/marketplace`, `/creator`, `/feed`, `/workspace`, `/level`, and `/agents`.
- API routes currently include assistant knowledge lookup, analytics events, and lightweight auth signin/callback/signout endpoints.

## Components
- Shared marketing and shell components live in `src/components`, including `Navbar`, `Hero`, `HomePage`, `GlassCard`, `FloatingBlobs`, and `SectionCard`.
- Ecosystem feature components live in `src/components/ecosystem`.
- Agent marketplace UI lives in `src/components/agents`.

## Styles and UI system
- Tailwind config scans `src/app`, `src/components`, `src/data`, `src/lib`, and `src/config`.
- Global CSS provides animated gradients, glass cards, text gradients, and dark-mode variants.
- The current design language is colorful, glassmorphic, and youth-oriented.

## Data structure
- Static seed data is stored in `src/data`, including site content, AI universe data, lab items, tools, projects, network marketplace/creators, changelog, and knowledge articles.
- `prisma/schema.prisma` already exists with PostgreSQL datasource and early creator-network models.

## Deployment configuration
- `next.config.ts` enables strict mode and sets package import optimization for `lucide-react` and `framer-motion`.
- `src/app/sitemap.ts` and `src/app/robots.ts` provide SEO crawl surfaces compatible with Vercel deployments.
- Environment examples live in `.env.example`.

## V7 upgrade considerations
- Preserve localized routes and existing redirects while adding V7 routes.
- Keep database-backed models optional at build time so Vercel can build without a live PostgreSQL connection.
- Add NextAuth/Prisma/PostgreSQL structure without breaking static rendering of public pages.
