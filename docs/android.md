# SprayCalc for Android

The Android app is the same React app, packaged with
[Capacitor](https://capacitorjs.com). There is no second codebase: `npm run
build` produces `dist/`, and the native shell in `android/` loads that bundle
from inside the APK. A change to the calculator ships to both the web app and
the Android app.

Serving the bundle locally (rather than pointing a WebView at the live site)
is deliberate — the app has to work in a field with no signal.

## Quick reference

| Command | What it does |
| --- | --- |
| `npm run android:sync` | Build the web bundle and copy it into `android/` |
| `npm run android:open` | …then open the project in Android Studio |
| `npm run android:run` | …then install and launch on a connected device/emulator |
| `npm run android:apk` | …then build a debug APK |
| `npm run android:release` | …then build a release AAB for the Play Store |
| `npm run android:assets` | Regenerate launcher icons and splash screens |

Run `npm run android:sync` after **every** web change. Gradle packages
whatever was last copied into `android/app/src/main/assets/public`, so
skipping the sync silently ships a stale bundle.

## Prerequisites

- **JDK 21** (`java -version`)
- **Android SDK** with platform + build-tools **35**. Easiest via Android
  Studio; otherwise install the command line tools and:
  ```bash
  sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
  ```
- `android/local.properties` pointing at the SDK (Android Studio writes this
  for you):
  ```properties
  sdk.dir=/path/to/Android/sdk
  ```
  It is gitignored — every developer sets their own.

## Building

Debug APK, for sideloading and testing:

```bash
npm run android:apk
# → android/app/build/outputs/apk/debug/app-debug.apk
```

Release bundle, for the Play Store:

```bash
npm run android:release
# → android/app/build/outputs/bundle/release/app-release.aab
```

### Signing a release

Create a keystore once and keep it somewhere safe — losing it means never
being able to update the Play Store listing again:

```bash
keytool -genkey -v -keystore spraycalc-release.jks \
  -keyalg RSA -keysize 2048 -validity 10000 -alias spraycalc
```

Then create `android/keystore.properties`:

```properties
storeFile=/absolute/path/to/spraycalc-release.jks
storePassword=…
keyAlias=spraycalc
keyPassword=…
```

`android/app/build.gradle` picks that file up automatically and signs release
builds with it. Both the keystore and the properties file are gitignored — do
not commit either. Without the file, debug builds are unaffected and release
builds are simply unsigned.

Bump `versionCode` (and usually `versionName`) in `android/app/build.gradle`
before each Play Store upload; Play rejects a `versionCode` it has seen.

## What differs from the web app

Everything below is handled at runtime by `Capacitor.isNativePlatform()`, so
the browser build is byte-for-byte unaffected.

| Area | Web | Android |
| --- | --- | --- |
| Offline | Service worker cache | Assets ship inside the APK; the service worker is not registered at all, so an app update can never be pinned to a stale bundle |
| Share | `navigator.share`, clipboard fallback | `@capacitor/share` — the Android WebView has no `navigator.share` |
| PDF export | `doc.save()` download | Written to the app cache, then handed to the system share sheet (Save to Files / print / email). `doc.save()`'s anchor-download trick is a no-op in a WebView |
| Back | n/a | Closes the topmost modal, menu or tour; exits the app only when nothing is open |
| Links | Read from the page URL | Also delivered via `appUrlOpen` deep links, including cold start |
| Google sign-in | Available when Firebase is configured | Hidden — see below |

### Absolute URLs

Inside the shell the page origin is `https://localhost`, so anything that has
to reach or be opened by the outside world resolves against
`VITE_PUBLIC_APP_URL` (default `https://spraycalc.netlify.app`) instead of
`window.location`:

- the "Scan rec" OCR call to `/.netlify/functions/ocr`
- share links and the QR code printed on exported PDFs

If the site moves off Netlify, set `VITE_PUBLIC_APP_URL` at build time **and**
update the App Links host in `android/app/src/main/AndroidManifest.xml`.

### Google sign-in and cloud sync

Hidden in the Android app. `signInWithPopup` has no popup to open inside a
WebView, and the redirect flow cannot return to the shell's `https://localhost`
origin. Saved mixes still work — they go to local storage, exactly as they do
on the web when Firebase is not configured.

Enabling it would mean native Google Sign-In rather than the web SDK flow:

1. `npm i @capacitor-firebase/authentication`
2. Add an Android app in the Firebase console, download `google-services.json`
   into `android/app/`, and register the SHA-1 of both the debug and release
   signing keys.
3. Sign in through the plugin, then hand the resulting credential to the
   Firebase JS SDK via `signInWithCredential` so the existing Firestore sync
   code keeps working unchanged.
4. Drop the `&& !isNativeApp()` guard in `src/hooks/useAuth.ts`.

Note that step 2 makes `google-services.json` a hard build requirement for
anyone cloning the repo, which is why it is not wired up by default.

## Deep links

Shared mixes (`?m=…`) open in the app two ways:

- **App Links** — `https://spraycalc.netlify.app/?m=…`. Needs
  `/.well-known/assetlinks.json` served from the domain, containing the release
  key's SHA-256 fingerprint. Get the JSON from the Play Console under *Setup →
  App integrity*, or generate it with
  [Google's tool](https://developers.google.com/digital-asset-links/tools/generator).
  Until that file is published, Android just opens the link in a browser — the
  link itself still works.
- **Custom scheme** — `spraycalc://open?m=…`. No domain verification needed,
  so it works immediately.

Test either with:

```bash
adb shell am start -a android.intent.action.VIEW -d "spraycalc://open?m=<payload>"
```

## Icons and splash screen

Source artwork lives in `public/icons/icon.svg`.
`scripts/generate-android-assets.js` renders it into the PNG sources in
`assets/`, and `@capacitor/assets` fans those out into every density. Both are
run by `npm run android:assets`.

One manual step afterwards: `@capacitor/assets` rewrites
`mipmap-anydpi-v26/ic_launcher.xml` and `ic_launcher_round.xml` with a 16.7%
inset on both adaptive-icon layers. That inset pulls the solid green background
away from the edges — so launcher masks expose transparent corners — and
shrinks the droplet to about half the size Material's key lines call for. Both
files are checked in with full-bleed layers and a `<monochrome>` entry for
Android 13+ themed icons; restore them after regenerating.

## Troubleshooting

**Changes don't show up.** You built the web app but didn't sync. Run
`npm run android:sync`.

**"Scan rec" fails in the app but works on the web.** The OCR function is
reached over the network at `VITE_PUBLIC_APP_URL`; check the device has signal
and that the deployed site actually serves `/.netlify/functions/ocr`.

**Back button exits the app instead of closing a dialog.** The dialog isn't
registered — add `useBackHandler(isOpen, close)` from `src/hooks/useBackHandler.ts`.

**Gradle can't find the SDK.** `android/local.properties` is missing or points
somewhere wrong.
