// Renders the source artwork in `public/icons/icon.svg` into the PNG sources
// that `@capacitor/assets` expects, then that tool fans them out into every
// Android mipmap/drawable density.
//
//   node scripts/generate-android-assets.js
//   npx @capacitor/assets generate --android
//
// Only needs re-running when the icon artwork changes. The generated PNGs in
// assets/ and android/app/src/main/res/ are committed, so a normal build never
// touches this script.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS_DIR = path.join(ROOT, 'assets');

const GREEN = '#498a5a';
const WHITE = '#ffffff';

// The droplet outline from icon.svg, in its original 512 viewBox coordinates
// so it can be re-placed at any scale. Written out twice (once to fill, once
// to clip) rather than via <use>, which not every SVG rasteriser resolves.
const DROP_PATH =
  'M 256 96 C 256 96 388 230 388 318 C 388 392 326 450 256 450 ' +
  'C 186 450 124 392 124 318 C 124 230 256 96 256 96 Z';

// The droplet's bounding box within that viewBox, used to centre on the
// artwork itself rather than on the (taller, empty-topped) canvas.
const DROP = { x: 124, y: 96, w: 264, h: 354 };
const DROP_CX = DROP.x + DROP.w / 2;
const DROP_CY = DROP.y + DROP.h / 2;

// A unique clip id per call: several copies of the artwork can end up in one
// document, and duplicate ids would make them share the first clip path.
let clipSeq = 0;

function artwork() {
  const clipId = `dropClip${clipSeq++}`;
  return `
    <defs>
      <clipPath id="${clipId}"><path d="${DROP_PATH}"/></clipPath>
    </defs>
    <path d="${DROP_PATH}" fill="#ffffff"/>
    <rect x="120" y="338" width="272" height="120" fill="#d1c343" clip-path="url(#${clipId})"/>
    <rect x="120" y="324" width="272" height="16" fill="#1c291f" clip-path="url(#${clipId})"/>
    <g fill="#1c291f" clip-path="url(#${clipId})">
      <rect x="158" y="206" width="64" height="14" rx="7"/>
      <rect x="158" y="248" width="40" height="14" rx="7"/>
      <rect x="158" y="290" width="64" height="14" rx="7"/>
    </g>`;
}

// Places the bare artwork on a `size` canvas with the droplet scaled to
// `dropHeight` px and centred. Used for the adaptive-icon foreground layer,
// which sits on its own green background layer.
function centredArtwork(size, dropHeight) {
  const scale = dropHeight / DROP.h;
  return `<g transform="translate(${size / 2},${size / 2}) scale(${scale}) translate(${-DROP_CX},${-DROP_CY})">${artwork()}</g>`;
}

// The complete app icon — green rounded square with the artwork inside —
// drawn at `tile` px and centred on a `size` canvas. The droplet is white, so
// it needs this green tile behind it anywhere the background isn't green.
function iconTile(size, tile) {
  const scale = tile / 1024;
  const offset = (size - tile) / 2;
  return (
    `<g transform="translate(${offset},${offset}) scale(${scale})">` +
    `<rect width="1024" height="1024" rx="160" fill="${GREEN}"/>` +
    centredArtwork(1024, 708) +
    `</g>`
  );
}

function svg(size, body) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${body}</svg>`,
  );
}

async function render(name, size, body) {
  await sharp(svg(size, body)).png().toFile(path.join(ASSETS_DIR, name));
  console.log(`  ${name}  ${size}×${size}`);
}

async function main() {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  console.log('Generating Capacitor asset sources:');

  // Legacy square launcher icon.
  await render('icon-only.png', 1024, iconTile(1024, 1024));

  // Adaptive icon layers. Android crops these to a device-chosen mask
  // (circle, squircle, …); only the centre 66% of the canvas is guaranteed
  // visible, and Material's key lines put the icon's visual element at ~61%.
  // Both layers are full-bleed — the inset that @capacitor/assets writes into
  // ic_launcher.xml is removed afterwards (see docs/android.md), because
  // insetting a solid background leaves transparent corners under the mask.
  await render('icon-background.png', 1024, `<rect width="1024" height="1024" fill="${GREEN}"/>`);
  await render('icon-foreground.png', 1024, centredArtwork(1024, 600));

  // Splash: the icon tile on the app's own white background. Kept small
  // relative to the canvas so CENTER_CROP scaling can't clip it on any aspect
  // ratio. The app has no dark theme, so both variants are the light one.
  const splash = `<rect width="2732" height="2732" fill="${WHITE}"/>${iconTile(2732, 720)}`;
  await render('splash.png', 2732, splash);
  await render('splash-dark.png', 2732, splash);

  console.log('\nNext: npx @capacitor/assets generate --android');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
