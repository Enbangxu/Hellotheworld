# Project Analysis

## Framework

- Next.js 15 application using the App Router under `src/app`.
- React 19 with TypeScript.
- Tailwind CSS powers global styling and utility classes.
- Framer Motion and Lucide React are used for animation and icons.

## package.json

- Scripts:
  - `npm run dev`: starts the Next.js dev server.
  - `npm run build`: creates a production build.
  - `npm run start`: starts the production server.
  - `npm run lint`: runs ESLint across the project.
- Core dependencies: `next`, `react`, `react-dom`, `framer-motion`, `lucide-react`.
- Dev dependencies include TypeScript, ESLint, Tailwind CSS, PostCSS, and Autoprefixer.

## Routing

- Root route `src/app/page.tsx` redirects to the default locale.
- Localized routes live under `src/app/[locale]` with static locale params from `src/config/site.ts`.
- Middleware detects the visitor language and redirects non-localized paths to `/en` or `/zh`.
- SEO metadata is generated in `src/app/layout.tsx` and `src/app/[locale]/layout.tsx`.
- Sitemap and robots routes are implemented in `src/app/sitemap.ts` and `src/app/robots.ts`.

## Components

- `HomePage` composes the main localized landing page.
- `Navbar` provides responsive navigation, language switching, and theme toggling.
- `Hero`, `SectionCard`, `GlassCard`, and `FloatingBlobs` define the current visual system.

## Styles

- Global Tailwind styles live in `src/styles/globals.css`.
- The site uses animated gradients, glassmorphism cards, dark-mode-aware selectors, and responsive utility classes.

## Deployment config

- `next.config.ts` enables React strict mode and keeps standard Next.js/Vercel deployment behavior.
- No custom server or deployment flow is present.
- The project remains compatible with Vercel's default Next.js build pipeline.

## Upgrade approach

- Preserve the existing localized landing page and Hello the World visual identity.
- Add localized App Router sections for AI Lab, AI Tools, and Global Creator under `/[locale]/lab`, `/[locale]/tools`, and `/[locale]/global`.
- Keep middleware and deployment configuration intact.
- Use static data files and server/client components already aligned with the current stack.
