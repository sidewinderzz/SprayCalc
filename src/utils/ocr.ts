import { ScannedProduct } from '../types';

// In production (Netlify), route through a serverless function to avoid CORS.
// In local dev, the Anthropic API allows requests from localhost directly.
const OCR_ENDPOINT = import.meta.env.PROD
  ? '/.netlify/functions/ocr'
  : 'https://api.anthropic.com/v1/messages';

const MODEL = 'claude-haiku-4-5';

const SYSTEM_PROMPT = `You are extracting spray products from an agricultural recommendation form (such as a Helena Product Use Recommendation).

Return ONLY a JSON object (no markdown fences, no explanation) with this exact shape:
{"products": [{"name": string, "rate": number, "unit": string}], "sprayVolume": number|null}

--- PRODUCT NAMES ---
Use the name a farmer would actually say out loud or read off the jug — short, practical, and recognizable.
- Short brand codes like "ENC", "Zeal", "Roundup", "DYNE-AMIC", "Headline" are correct even if they look like abbreviations.
- NPK grade ratios in X-X-X format (e.g. "11-8-5", "15-0-0", "32-0-0") are nutrient analysis numbers that appear AFTER the brand name — never use them as the name. If a label reads "ENC 11-8-5", the name is "ENC".
- Omit parenthetical formulation codes like "(HAE)", "(EC)", "(WDG)", "(SC)".
- Do NOT include distributor or company names (e.g. "Helena", "Nutrien", "Valent", "BASF", "Syngenta", "Bayer") — these appear as row labels or column headers, not product names.

--- UNITS ---
The unit must be exactly one of:
"fl oz/acre" | "pt/acre" | "qt/acre" | "gal/acre" | "oz/acre" | "lb/acre" | "g/acre" |
"fl oz per 100 gal" | "pt per 100 gal" | "qt per 100 gal" | "gal per 100 gal" | "oz per 100 gal" | "lb per 100 gal" | "g per 100 gal"

Conversion rules:
- "Floz", "fl oz", "FL OZ", "oz (fluid)" -> "fl oz"
- "Qt", "QT" -> "qt"
- "Pt", "PT" -> "pt"
- "Gal", "GAL" -> "gal"
- "/A", "/ A", "/Acre", "per acre", "per ac", "per A" -> "/acre"
- "per 100 gal", "/ 100 gal", "/100 gal" -> "per 100 gal"
- If rate basis (per acre vs per 100 gal) is unclear, default to "/acre"

--- SPRAY VOLUME ---
Also look for a spray/carrier volume field labeled "Spray Vol", "Spray Volume", "Carrier", "Water", "GPA", or similar. This is the gallons of water/carrier applied per acre.
If found, set "sprayVolume" to that number (in gal/acre). If not found, set "sprayVolume" to null.

Only include products that have a clear numeric rate value listed. If no products are found, return {"products": [], "sprayVolume": null}.`;

export type OcrResult = {
  products: ScannedProduct[];
  sprayVolume?: number;
};

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
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: mimeType, data: imageBase64 },
              },
              {
                type: 'text',
                text: 'Extract all spray products, their application rates, and the spray volume (GPA) from this recommendation form.',
              },
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
  const raw = (data.content?.[0]?.text ?? '') as string;

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

  // Support both old array format and new object format
  const obj = Array.isArray(parsed) ? { products: parsed, sprayVolume: null } : parsed as any;

  if (!obj || !Array.isArray(obj.products)) {
    throw new Error('Unexpected response format from Claude');
  }

  const products = (obj.products as any[]).filter(
    (p) =>
      p &&
      typeof p.name === 'string' &&
      typeof p.rate === 'number' &&
      typeof p.unit === 'string'
  ) as ScannedProduct[];

  const sprayVolume =
    typeof obj.sprayVolume === 'number' && obj.sprayVolume > 0
      ? obj.sprayVolume
      : undefined;

  return { products, sprayVolume };
}
