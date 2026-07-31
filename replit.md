# Ag Spray Mixing Calculator

## Overview
A React-based agricultural spray mixing calculator that helps calculate product amounts for tank mixes based on fill volume, application rate, and product specifications.

It ships as a PWA and, from the same codebase, as an Android app
(see [docs/android.md](docs/android.md)).

## Tech Stack
- React 18 with TypeScript
- Vite for build tooling
- Capacitor for the Android wrapper (`android/`)
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
  utils/
    platform.ts - Native-vs-web detection + the public URL used by the app
    native.ts   - Android shell setup: status bar, back button, deep links
    share.ts    - Share sheet and PDF delivery, web and native
public/
  manifest.json - PWA manifest
  sw.js         - Service worker for offline support (web only)
android/        - Capacitor Android project
assets/         - Icon/splash sources for @capacitor/assets
dist/           - Production build output
```

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to create a production build
- Run `npm run preview` to preview the production build

## Android
The Android app wraps this same build with Capacitor — there is no second
codebase. `npm run android:sync` rebuilds and copies `dist/` into `android/`;
`npm run android:apk` produces a debug APK. Platform differences (share sheet,
PDF delivery, hardware back button, deep links, absolute URLs) are handled at
runtime behind `isNativeApp()`. Full details, including release signing and
Play Store steps, are in [docs/android.md](docs/android.md).

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

## Deployment
Configured for static deployment using the `dist` directory after building.
