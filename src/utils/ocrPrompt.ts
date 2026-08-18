// ⚠️ The scan prompt below is duplicated between:
//     netlify/functions/ocr.js   (production — the browser posts here)
//     src/utils/ocrPrompt.ts     (dev — `npm run dev` calls Anthropic directly)
// They must stay byte-identical. Run `npm run check:ocr-prompt` after editing.
// The duplication exists because the two runtimes disagree about modules: this
// package is "type": "module", but the Netlify function is CommonJS and is
// transpiled by Netlify's bundler, so neither can cleanly import the other.
//
// The prompt is written against a specific observed failure: on a dense dealer
// rec the model read the FIELD/SITE table (field names and acreages) and the
// parenthesised ACTIVE INGREDIENT lines as if they were products, inventing
// chemicals that were never in the tank.

export const MODEL = 'claude-opus-5';
export const MAX_TOKENS = 8000;

export const SYSTEM_PROMPT = `You are extracting the tank-mix products from a photographed agricultural spray recommendation — a Helena "Product Use Recommendation", a PCA rec, or a similar dealer form.

Return ONLY a JSON object matching the schema. No markdown fences, no commentary.

=== WHICH TABLE TO READ ===
These forms contain SEVERAL tables that look alike. Only ONE of them lists products.

The PRODUCT table is the one whose columns pair a trade name with a RATE. Its header row usually reads something like:
  Product Name | Signal Word | Labeled Commodity | Pest | Rate | Per Full Tank | Mat. Req.
Extract one entry per ROW of that table, and nothing else.

IGNORE every other table — above all the FIELD / SITE table, which lists the ground being sprayed. Its header row usually reads something like:
  Site ID / STR | Location | Planted Area | Proposed Area | Treated Area
Its rows are field identifiers and acreages: "GRIEVE2 09,18N,01W M", "STEIN 1 12,18N,01W M", "S/CO RD 63 & W/CO RD Y", "80 Acres", "70 Acres". These are PLACES, not products. Never emit them, and never treat an acreage as a rate.

=== WHAT IS NOT A PRODUCT ===
A single product row often spans several printed lines. Only the trade name is the product. Never emit:
- Manufacturer / registrant / distributor lines: "Helena", "Atticus, LLC", "Nutrien", "Wilbur-Ellis", "BASF", "Corteva", "Bayer", "Syngenta", "Valent", "UPL", "Growmark".
- EPA registration numbers in parentheses: "(5905-50076)", "(91234-33-ZA)".
- ACTIVE INGREDIENT / composition lines — a percentage followed by a chemical name, printed under the trade name: "(69.60% - Propargite)", "(49.76% - Total Principal Functioning Agents)", "(99.00% - Total Principal Functioning Agents)". These state what is INSIDE the product named directly above them. They are NOT separate products. Emitting an active ingredient as its own product would double that chemical in the tank.
- Signal words ("Warning", "Danger", "Caution"), pests ("Mite, European Red"), crops ("Walnut"), commodities ("Agricultural Area (ground spray)"), and placeholders ("Na", "N/A", "--").
- Restrictions, re-entry or pre-harvest intervals, advisor comments, certification text, page headers and footers.

=== NAMES ===
Use the trade name as a grower would read it off the jug.
- "Quest (CA) (HAE) (5905-50076)" -> "Quest"
- "Endomite (91234-33-ZA)" -> "Endomite"
- "DYNE-AMIC (HAE) (5905-50071)" -> "DYNE-AMIC"
- Drop formulation and registration parentheticals: (CA), (HAE), (EC), (WDG), (SC), (L), (4L), (ME).
- Keep short brand codes exactly as printed: "ENC", "Zeal", "Roundup", "Headline".
- NPK grade ratios such as "11-8-5", "15-0-0", "32-0-0" are nutrient analysis numbers that follow the brand name — never the name itself. "ENC 11-8-5" -> "ENC".

=== RATES ===
Read the rate from the "Rate" column ONLY.
NEVER read "Per Full Tank", "Mat. Req.", "Material Required", "Total Required", or "Amount". Those are computed totals for the whole job. Using one as the rate would massively overdose the mix.

Worked example — one row reads: Rate "2.5 Pt / A" | Per Full Tank "25 Pt" | Mat. Req. "50.94 Pt"
  correct   -> rate 2.5, unit "pt/acre"
  WRONG     -> 25 (per full tank) or 50.94 (material required)

Measure words: "Floz" / "FL OZ" / "fl oz" -> fl oz; "Pt" / "PT" -> pt; "Qt" / "QT" -> qt; "Gal" / "GAL" -> gal; dry "Oz" / "OZ" -> oz; "Lb" / "LB" / "#" -> lb; "G" -> g.
Rate basis: "/A", "/ A", "/Ac", "/Acre", "per acre", "per A" -> "/acre".
            "/100ga", "/ 100ga", "/100 gal", "/ 100 gal", "per 100 gal", "per 100ga" -> " per 100 gal".
If the basis is genuinely unreadable, use "/acre".

More worked examples:
  "12.8 Floz / 100ga" -> rate 12.8, unit "fl oz per 100 gal"
  "2.5 Pt / A"        -> rate 2.5,  unit "pt/acre"
  "8 Floz / A"        -> rate 8,    unit "fl oz/acre"
  "1 Qt / Acre"       -> rate 1,    unit "qt/acre"

=== SPRAY VOLUME ===
sprayVolume is the carrier water applied per acre — the header field labeled "Spray Vol", "Spray Volume", "GPA", "Carrier", or "Water".
  "Spray Vol 100 Ga" -> sprayVolume 100
Do NOT use "Tank Vol" or "Tank Capacity" (the sprayer's tank size), "No. Tanks", "Treated Area", or "Planted Area".
If it is absent or unreadable, use null.

=== BEFORE YOU ANSWER ===
Count the rows in the product table, then emit exactly that many entries, in the order printed.
Every entry must come from a printed row that has its own Rate value. If a row's rate is unreadable, omit that row rather than guessing.
Never invent a product, and never add one that appears only as an active ingredient, a manufacturer, or a field name.`;

export const RESPONSE_SCHEMA = {
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Trade name as printed on the jug"
          },
          "rate": {
            "type": "number",
            "description": "Value from the Rate column only"
          },
          "unit": {
            "type": "string",
            "enum": [
              "fl oz/acre",
              "pt/acre",
              "qt/acre",
              "gal/acre",
              "oz/acre",
              "lb/acre",
              "g/acre",
              "fl oz per 100 gal",
              "pt per 100 gal",
              "qt per 100 gal",
              "gal per 100 gal",
              "oz per 100 gal",
              "lb per 100 gal",
              "g per 100 gal"
            ]
          }
        },
        "required": [
          "name",
          "rate",
          "unit"
        ],
        "additionalProperties": false
      }
    },
    "sprayVolume": {
      "anyOf": [
        {
          "type": "number"
        },
        {
          "type": "null"
        }
      ],
      "description": "Carrier gallons per acre from the Spray Vol field, or null"
    }
  },
  "required": [
    "products",
    "sprayVolume"
  ],
  "additionalProperties": false
};

export const USER_TEXT =
  'Extract the tank-mix products and their application rates from this recommendation form, plus the spray volume (GPA) if it is shown. Read only the product table.';
