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

## Google Sign-In & Cloud Mix Sync (Firebase)
Optional Firebase integration lets users sign in with Google and sync their
saved mixes to Firestore (`users/{uid}/mixes/{mixName}`). The app works fully
offline/localStorage-only when Firebase is not configured — the sign-in UI is
simply hidden.

Setup:
1. Create a project at https://console.firebase.google.com (free Spark plan —
   no credit card). Free tier limits (50K Firestore reads + 20K writes/day,
   1 GiB storage, Google sign-in included) are far more than this app needs.
2. Add a Web app, enable **Authentication → Sign-in method → Google**, and
   create a **Firestore database** (production mode).
3. Add your deployed domain under Authentication → Settings → Authorized domains.
4. Set Firestore security rules so users can only read/write their own mixes:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/mixes/{mixId} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
5. Set the `VITE_FIREBASE_*` env vars (see `.env.example`) at build time.

Sync behavior: saved mixes always write to localStorage; when signed in they
also write to Firestore. On sign-in, cloud and local mixes are merged by name
(newest `updatedAt` wins; ties go to the cloud copy) and local-only mixes are
uploaded.

## Water Pre-Fill
When every product in the mix uses a volumetric unit (fl oz/pt/qt/gal), the
summaries and Per Mix cards show how many gallons of water to pre-fill the
tank with (tank volume minus total chemical volume) — see `calculatePreFill`
in `src/utils/calculations.ts`. If any product is weight-based (oz/lb/g), the
estimate is marked unavailable instead.

## Deployment
Configured for static deployment using the `dist` directory after building.
