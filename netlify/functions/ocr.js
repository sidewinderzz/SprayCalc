const MODEL = 'claude-haiku-4-5';

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

For the product name, use the product trade name only (e.g. "ENC 11-8-5", "Zeal MVP Miticide").
Do NOT include distributor or manufacturer names (e.g. "Helena", "Nutrien", "Valent", "BASF", "Syngenta", "Bayer") — these appear as row labels or headers in the form and are not part of the product name.
If a distributor name appears immediately before or above the product name in the table, omit it and use only the product name itself.
Only include products that have a clear numeric rate value listed.
If no products are found, return [].`;

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

  // Parse request body
  let imageBase64, mimeType, apiKey;
  try {
    ({ imageBase64, mimeType, apiKey } = JSON.parse(event.body || '{}'));
  } catch (e) {
    return respond(400, { error: 'Invalid JSON body' });
  }

  if (!apiKey || !imageBase64 || !mimeType) {
    return respond(400, { error: 'Missing required fields: imageBase64, mimeType, apiKey' });
  }

  // Call Anthropic server-side (no CORS restriction here)
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
                text: 'Extract all spray products and their application rates from this recommendation form.',
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

  // Parse response — Anthropic may return non-JSON on certain errors
  let data;
  const contentType = upstream.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      data = await upstream.json();
    } else {
      const text = await upstream.text();
      // Try to parse anyway; surface the raw text if it's not JSON
      try { data = JSON.parse(text); } catch { data = { error: text }; }
    }
  } catch (e) {
    console.error('Failed to read Anthropic response:', e);
    return respond(502, { error: 'Unreadable response from Anthropic API' });
  }

  return respond(upstream.status, data);
};
