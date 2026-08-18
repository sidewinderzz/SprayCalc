// Fails if the scan prompt drifts between the production Netlify function and
// the dev-server copy. The two runtimes can't import from each other (see the
// note at the top of either file), so the text is duplicated on purpose — this
// check is what keeps "fixed the prompt" from meaning "fixed it in one place".

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const FILES = {
  production: join(root, 'netlify/functions/ocr.js'),
  dev: join(root, 'src/utils/ocrPrompt.ts'),
};

// Grab the SYSTEM_PROMPT template literal, whichever way it's declared.
function extractPrompt(path) {
  const src = readFileSync(path, 'utf8');
  const match = src.match(/SYSTEM_PROMPT\s*=\s*`([\s\S]*?)`;/);
  if (!match) throw new Error(`No SYSTEM_PROMPT template literal found in ${path}`);
  return match[1];
}

const prompts = Object.entries(FILES).map(([label, path]) => ({
  label,
  path,
  text: extractPrompt(path),
}));

const [a, b] = prompts;

if (a.text === b.text) {
  console.log(`ocr prompt in sync (${a.text.length} chars) across ${prompts.length} runtimes`);
  process.exit(0);
}

console.error('OCR prompt drift detected between runtimes:\n');
for (const p of prompts) console.error(`  ${p.label.padEnd(11)} ${p.path} (${p.text.length} chars)`);

const aLines = a.text.split('\n');
const bLines = b.text.split('\n');
for (let i = 0; i < Math.max(aLines.length, bLines.length); i++) {
  if (aLines[i] !== bLines[i]) {
    console.error(`\nFirst difference at line ${i + 1}:`);
    console.error(`  ${a.label}: ${JSON.stringify(aLines[i] ?? '<missing>')}`);
    console.error(`  ${b.label}: ${JSON.stringify(bLines[i] ?? '<missing>')}`);
    break;
  }
}
process.exit(1);
