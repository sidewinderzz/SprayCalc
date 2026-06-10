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

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function respond(statusCode, body) {
  return {
    statusCode,
    headers: { ...CORS, 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed' });
  }

  let imageBase64, mimeType, apiKey;
  try {
    ({ imageBase64, mimeType, apiKey } = JSON.parse(event.body || '{}'));
  } catch (e) {
    return respond(400, { error: 'Invalid JSON body' });
  }

  if (!apiKey || !imageBase64 || !mimeType) {
    return respond(400, { error: 'Missing required fields: imageBase64, mimeType, apiKey' });
  }

  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
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
      }),
    });
  } catch (e) {
    console.error('Fetch to Anthropic failed:', e);
    return respond(502, { error: 'Could not reach Anthropic API', detail: String(e) });
  }

  let data;
  const contentType = upstream.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      data = await upstream.json();
    } else {
      const text = await upstream.text();
      try { data = JSON.parse(text); } catch { data = { error: text }; }
    }
  } catch (e) {
    console.error('Failed to read Anthropic response:', e);
    return respond(502, { error: 'Unreadable response from Anthropic API' });
  }

  return respond(upstream.status, data);
};
