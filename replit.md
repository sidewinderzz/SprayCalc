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

## Google Sign-In & Cloud Sync (Firebase)
Optional Firebase integration lets users sign in with Google and sync both
their saved mixes and their Claude API key to Firestore. The app works fully
offline/localStorage-only when Firebase is not configured — the sign-in UI is
simply hidden.

Documents written, all under the signed-in user's own subtree:

| Path | Contents |
| --- | --- |
| `users/{uid}/mixes/{mixId}` | One saved mix (`name`, `data`, `updatedAt`) |
| `users/{uid}/settings/claudeApiKey` | Scan Recommendations key (`key`, `scanEnabled`, `updatedAt`) |
| `users/{uid}/diagnostics/probe` | Transient write/read probe, deleted immediately |

Setup:
1. Create a project at https://console.firebase.google.com (free Spark plan —
   no credit card). Free tier limits (50K Firestore reads + 20K writes/day,
   1 GiB storage, Google sign-in included) are far more than this app needs.
2. Add a Web app, enable **Authentication → Sign-in method → Google**, and
   create a **Firestore database** (production mode).
3. Add your deployed domain under Authentication → Settings → Authorized domains.
4. **Publish the security rules.** They live in `firestore.rules` at the repo
   root — this is the single most common reason cloud sync silently does
   nothing, because a production-mode database denies every read and write
   until they are published.
   ```
   npx firebase-tools login          # once
   npx firebase-tools use <project>  # once
   npm run deploy:rules
   ```
   Or paste `firestore.rules` into Firebase Console → Firestore Database →
   Rules → Publish. Do not hand-write a subset: the rules must cover
   `settings/{docId}` as well as `mixes/{mixId}`, or the API key will appear to
   save while never leaving the browser.
5. Set the `VITE_FIREBASE_*` env vars (see `.env.example`) at build time. On
   Netlify these go in Site settings → Environment variables; they are read at
   build time, so a change needs a redeploy to take effect.

Sync behavior: saves always write to localStorage first, so the app keeps
working offline and in the field. When signed in they also write to Firestore
and the UI waits for the server to acknowledge the write before reporting
success. On sign-in, cloud and local mixes are merged by name (newest
`updatedAt` wins; ties go to the cloud copy) and local-only mixes are uploaded.
The API key reconciles in both directions on sign-in, so a key entered before
signing in gets uploaded rather than stranded on one device.

Any write that fails is placed in a per-user retry queue in localStorage
(`scPendingCloudWrites:{uid}`) and retried on reconnect, on the next sign-in,
and on the next page load. Nothing is dropped silently.

### Troubleshooting cloud sync
Open the ⋮ menu → the account row shows a live sync status, and **Check** runs
an end-to-end write/read/delete probe against Firestore and reports the exact
error code.

| Symptom | Cause | Fix |
| --- | --- | --- |
| `permission-denied` | Rules not published, or published without the `settings` match | `npm run deploy:rules` |
| `not-found` | No Firestore database created in the project | Create one in the Firebase Console |
| `unauthenticated` | Auth token expired | Sign out and back in |
| `timeout` / `unavailable` | No connectivity, or a network blocking Firestore's WebChannel | Writes stay queued and retry automatically |
| "Cloud sync not configured" | `VITE_FIREBASE_*` env vars missing at build time | Set them and redeploy |

Note: the Claude API key is stored in plaintext in Firestore, readable only by
its owner under these rules. That is the same trust model as keeping it in
localStorage, but if a key is ever exposed, revoke it at
https://console.anthropic.com/keys.

## Deployment
Configured for static deployment using the `dist` directory after building.
