# Pixopharm Homepage — Working Directory

**Purpose:** Main marketing site for pixopharm.com — showcases all three sub-brands  
**Live URL:** https://pixopharm.com  
**GitHub:** https://github.com/ian-angus/pixopharm-waitlist (repo name is legacy — directory is now `homepage/`)

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/pages/Home.tsx` | Main homepage — hero, 3 products, about, who it's for |
| `/academy` | `src/pages/Academy.tsx` | Pixopharm Academy product page |
| `/labs` | `src/pages/Labs.tsx` | Pixopharm Labs product page (coming soon) |
| `/consulting` | `src/pages/Consulting.tsx` | Pixopharm Consulting product page (coming soon) |

## Shared Components

| File | Purpose |
|------|---------|
| `src/components/Nav.tsx` | Sticky nav — logo + Academy/Labs/Consulting + Sign In |
| `src/components/Footer.tsx` | Footer with product links and region |

## Tech Stack
- **Frontend:** React + TypeScript + react-router-dom v7
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Font:** DM Serif Display (Google Fonts, loaded via index.html)
- **Deploy:** Vercel (`npx vercel --prod`)

## Dev Commands
```bash
pnpm dev          # local dev server (run from homepage/)
pnpm build        # production build
npx vercel --prod # deploy to pixopharm.com
```

## Key URLs
- `pixopharm.com` → this project
- `academy.pixopharm.com` → LMS (lms/ codebase, separate Vercel project)
- All "Open Academy" links point to `https://academy.pixopharm.com`

## Skills — Use These
| Skill | When |
|-------|------|
| `document-skills:frontend-design` | UI/UX redesigns |
| `marketing-skills:copywriting` | Page copy |
| `marketing-skills:page-cro` | Conversion improvements |
| `marketing-skills:seo-audit` | SEO |

## Rules
- Always deploy with `npx vercel --prod` from this directory
- Never edit the LMS (lms/) from here — it is a separate project
- Keep `progress.md` at the parent level updated
