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

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS_HEADERS, body: 'Method Not Allowed' };
  }

  let imageBase64, mimeType, apiKey;
  try {
    ({ imageBase64, mimeType, apiKey } = JSON.parse(event.body));
  } catch {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  if (!apiKey || !imageBase64 || !mimeType) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing required fields: imageBase64, mimeType, apiKey' }),
    };
  }

  const upstream = await fetch('https://api.anthropic.com/v1/messages', {
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

  const data = await upstream.json();
  return {
    statusCode: upstream.status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
