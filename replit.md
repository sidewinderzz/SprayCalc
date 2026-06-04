# Ag Spray Mixing Calculator

## Overview
A React-based agricultural spray mixing calculator that helps calculate product amounts for tank mixes based on fill volume, application rate, and product specifications.

## Tech Stack
- React 18 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- PostCSS with Autoprefixer
- jsPDF + jspdf-autotable for real PDF export
- qrcode for QR code generation in PDF footer
- lz-string for URL-safe mix payload compression

## Mix Sharing
The app generates self-contained share links (`?m=<compressed-payload>`)
using lz-string. Opening such a link prefills the calculator (handled in
`src/App.tsx` via `readMixFromCurrentURL`). The PDF export embeds the same
link as a QR + printed URL on every page so a mix can be re-opened later.

## Project Structure
```
src/
  App.tsx       - Main application component with all UI and logic
  main.tsx      - React entry point
  index.css     - Global styles and Tailwind imports
public/
  manifest.json - PWA manifest
  sw.js         - Service worker for offline support
dist/           - Production build output
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to create a production build
- Run `npm run preview` to preview the production build

## Analytics
Optional Google Analytics 4 integration in `src/utils/analytics.ts`.
- Set `VITE_GA_MEASUREMENT_ID` (e.g. `G-XXXXXXXXXX`) at build time to enable.
  When unset, the GA script is never loaded and all `trackEvent` / `trackPageView`
  calls are silent no-ops.
- Tracked events (non-PII; product/mix names are never sent):
  - `page_view` on initial load, plus a second `page_view` + `view_shared_mix`
    when a `?m=` shared link opens the app.
  - `calculate_mix` (debounced) when the user has entered a valid mix.
  - `save_mix` when a named mix is saved.
  - `share_mix` when the share button is used (records `method`).
  - `export_pdf` when the PDF is exported.

## Deployment
Configured for static deployment using the `dist` directory after building.
