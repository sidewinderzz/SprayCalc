import { ScannedProduct, unitOptions } from '../types';
import { MAX_TOKENS, MODEL, RESPONSE_SCHEMA, SYSTEM_PROMPT, USER_TEXT } from './ocrPrompt';

// In production (Netlify), route through a serverless function to avoid CORS.
// In local dev, the Anthropic API allows requests from localhost directly.
const OCR_ENDPOINT = import.meta.env.PROD
  ? '/.netlify/functions/ocr'
  : 'https://api.anthropic.com/v1/messages';

export type OcrResult = {
  products: ScannedProduct[];
  sprayVolume?: number;
  /** Entries the model returned that failed validation and were discarded. */
  discarded: number;
};

const ALLOWED_UNITS = new Set<string>(unitOptions);

// The review modal renders `unit` into a fixed <select>; a value outside
// unitOptions would show as blank and silently compute to zero. Structured
// outputs already constrain this via a schema enum — this is the backstop for
// the dev path and for any future change that drops the schema.
function isUsableProduct(p: unknown): p is ScannedProduct {
  if (!p || typeof p !== 'object') return false;
  const { name, rate, unit } = p as Record<string, unknown>;
  return (
    typeof name === 'string' &&
    name.trim().length > 0 &&
    typeof rate === 'number' &&
    Number.isFinite(rate) &&
    rate > 0 &&
    typeof unit === 'string' &&
    ALLOWED_UNITS.has(unit)
  );
}

export async function extractProductsFromImage(
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<OcrResult> {
  const isProd = import.meta.env.PROD;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (!isProd) {
    headers['x-api-key'] = apiKey;
    headers['anthropic-version'] = '2023-06-01';
    headers['anthropic-dangerous-allow-browser'] = 'true';
  }

  const body = isProd
    ? JSON.stringify({ imageBase64, mimeType, apiKey })
    : JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        output_config: {
          effort: 'medium',
          format: { type: 'json_schema', schema: RESPONSE_SCHEMA },
        },
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mimeType, data: imageBase64 },
              },
              { type: 'text', text: USER_TEXT },
            ],
          },
        ],
      });

  const response = await fetch(OCR_ENDPOINT, { method: 'POST', headers, body });

  if (!response.ok) {
    const errText = await response.text().catch(() => `HTTP ${response.status}`);
    throw new Error(`Claude API error ${response.status}: ${errText}`);
  }

  const data = await response.json();

  // Structured outputs put the JSON in the first text block. Older responses
  // (and any future non-schema fallback) may wrap it in a markdown fence.
  const raw = (data.content?.find((b: { type?: string }) => b?.type === 'text')?.text ?? '') as string;

  const cleaned = raw
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error(`Could not parse response. First 200 chars: ${cleaned.slice(0, 200)}`);
  }

  // Support both the old bare-array format and the current object format.
  const obj = Array.isArray(parsed)
    ? { products: parsed, sprayVolume: null }
    : (parsed as { products?: unknown; sprayVolume?: unknown });

  if (!obj || !Array.isArray(obj.products)) {
    throw new Error('Unexpected response format from Claude');
  }

  const products = obj.products.filter(isUsableProduct);
  const discarded = obj.products.length - products.length;
  if (discarded > 0) {
    console.warn(`Discarded ${discarded} scanned row(s) that failed validation`);
  }

  const sprayVolume =
    typeof obj.sprayVolume === 'number' && obj.sprayVolume > 0 ? obj.sprayVolume : undefined;

  return { products, sprayVolume, discarded };
}
