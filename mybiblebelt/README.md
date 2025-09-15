# mybiblebelt.org (Vite + React + Tailwind)

An MVP for mybiblebelt.org with six sections:

- **Welcome**
- **Resources** (Starter Kits with expandable studies)
- **Community** (local info + lightweight chats)
- **Personal Growth** (devotional, goals, journal, ministry)
- **Bible Study** (dated notes, Google Meet, simple scheduling)
- **Pay It Forward** (donations & fundraising progress)

## Prereqs
- Node.js 18+ and npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build
```bash
npm run build
npm run preview
```

## Deploy options
### GitHub Pages
1. Uncomment `base: '/mybiblebelt/',` in `vite.config.js`.
2. Build: `npm run build`
3. Push `dist/` via a GH Pages action or use a simple deploy script.

### Vercel / Netlify
- Import the repo and deploy with defaults (build command `vite build`, output `dist`).

## Notes
- Data is stored in `localStorage` for demo purposes.
- Replace the Stripe test URL in the Donate page with your real Checkout link when ready.
