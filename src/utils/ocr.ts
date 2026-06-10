import { ScannedProduct } from '../types';

// In production (Netlify), route through a serverless function to avoid CORS.
// In local dev, the Anthropic API allows requests from localhost directly.
const OCR_ENDPOINT = import.meta.env.PROD
  ? '/.netlify/functions/ocr'
  : 'https://api.anthropic.com/v1/messages';

const MODEL = 'claude-3-5-haiku-20241022';

const SYSTEM_PROMPT = `You are extracting spray products from an agricultural recommendation form (such as a Helena Product Use Recommendation).
Return ONLY a JSON array (no markdown fences, no explanation, no extra text) of objects with this exact shape:
[{"name": string, "rate": number, "unit": string}]

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

For the product name, use the commercial brand name (e.g. "Zeal MVP Miticide"), not the chemical name.
Only include products that have a clear numeric rate value listed.
If no products are found, return [].`;

export async function extractProductsFromImage(
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<ScannedProduct[]> {
  // Production: POST slim payload to our Netlify proxy (no CORS restriction).
  // Dev: call Anthropic directly — localhost is allowed by their CORS policy.
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
                text: 'Extract all spray products and their application rates from this recommendation form.',
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

  if (!Array.isArray(parsed)) {
    throw new Error('Unexpected response format from Claude');
  }

  return (parsed as any[]).filter(
    (p) =>
      p &&
      typeof p.name === 'string' &&
      typeof p.rate === 'number' &&
      typeof p.unit === 'string'
  ) as ScannedProduct[];
}
