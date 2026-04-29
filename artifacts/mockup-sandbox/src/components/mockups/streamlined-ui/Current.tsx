import './_group.css';

const colors = {
  primary: '#498a5a',
  secondary: '#d1c343',
  primaryLight: '#76a886',
  primaryDark: '#2d6840',
  secondaryLight: '#e4d97b',
  secondaryDark: '#b2a529',
  lightText: '#1c291f',
};

const products = [
  { id: 1, name: 'Roundup PowerMax', rate: 32, unit: 'oz/acre', tankAmount: '1706.67 oz', tankBreakdown: '5 jugs + 106.67 oz', perFull: '1706.67 oz', perFullBreakdown: '5 jugs + 106.67 oz', totalBuy: '60 gal', containerStar: '24 × 2.5 gal jugs', containerAlt: '60 × 1 gal jugs' },
  { id: 2, name: '2,4-D Amine', rate: 16, unit: 'oz/acre', tankAmount: '853.33 oz', tankBreakdown: '6 jugs + 85.33 oz', perFull: '853.33 oz', perFullBreakdown: '6 jugs + 85.33 oz', totalBuy: '30 gal', containerStar: '30 × 1 gal jugs', containerAlt: '12 × 2.5 gal jugs' },
];

const fillVolume = 800;
const applicationRate = 15;
const acresPerFill = 53.33;
const fieldSize = 240;
const implementWidth = 70;
const speed = 12;
const fillTime = 8;

export function Current() {
  return (
    <div className="spray-calc-root min-h-screen p-4" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-3xl mx-auto">
        {/* ── Header ── */}
        <div className="flex justify-between items-center mb-6 gap-2">
          <h1 className="text-xl font-bold whitespace-nowrap" style={{ color: colors.primary }}>Spray Calc</h1>
          <div className="flex items-center gap-2">
            <button
              className="h-9 px-4 rounded-lg text-sm font-medium whitespace-nowrap"
              style={{ backgroundColor: 'transparent', color: colors.primaryDark, border: `1px solid ${colors.primary}50` }}
            >Clear</button>
            <button
              className="h-9 px-4 rounded-lg text-sm font-medium text-white whitespace-nowrap"
              style={{ backgroundColor: colors.primary }}
            >Save Mix</button>
            <button className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ color: colors.primaryDark }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mix Information ── */}
        <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}25` }}>
          <h2 className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>Mix Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>Fill Volume (gallons)</label>
              <input readOnly value={fillVolume} className="w-full p-3 border rounded-lg text-gray-800 text-base"
                style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>Application Rate (GPA)</label>
              <input readOnly value={applicationRate} className="w-full p-3 border rounded-lg text-gray-800 text-base"
                style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.lightText }}>Acres Per Fill</label>
              <input readOnly value={acresPerFill.toFixed(2)} className="w-full p-3 border rounded-lg text-gray-800 text-base"
                style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }} />
            </div>
          </div>
        </div>

        {/* ── Products ── */}
        <div className="p-4 rounded-xl mb-6" style={{ backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}25` }}>
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg mb-3 text-xs"
            style={{ backgroundColor: `${colors.primary}12`, color: colors.primaryDark, border: `1px solid ${colors.primary}25` }}>
            <span><strong>Tip:</strong> Press <kbd className="px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ backgroundColor: `${colors.primary}20`, border: `1px solid ${colors.primary}30` }}>Enter</kbd> to move between fields — on the last field it adds a new product automatically.</span>
            <button className="opacity-40">×</button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>Products</h2>
            <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: colors.primary }}>+ Add Product</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map(p => <ProductCardCurrent key={p.id} p={p} />)}
          </div>
        </div>

        {/* ── Summary ── (matches src/App.tsx order: right after Products) */}
        <div className="p-4 rounded-lg mt-6" style={{ backgroundColor: colors.secondaryLight + '20' }}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold" style={{ color: colors.primaryDark }}>Summary</h2>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-lg" style={{ backgroundColor: colors.primary + '18', border: `1px solid ${colors.primary}30` }}>
                <svg width="16" height="16" fill={colors.primary} viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" /><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3z" /></svg>
              </button>
              <button className="p-2.5 rounded-lg" style={{ backgroundColor: colors.primary + '18', border: `1px solid ${colors.primary}30` }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </button>
              <button className="px-3 py-2 rounded-lg flex items-center gap-1.5 text-xs font-medium" style={{ backgroundColor: colors.primary, color: 'white' }}>
                PDF
              </button>
            </div>
          </div>
          <div>
            <p className="mb-1">For a <strong>800 gallon</strong> mix at <strong>15 GPA</strong>:</p>
            <p className="mb-1">• This mix will cover <strong>53.33 acres</strong></p>
            <p className="mb-3">• Add the following to your mix:</p>
            <ul className="list-disc pl-6 space-y-1">
              {products.map(p => (
                <li key={`sum-${p.id}`}><strong>{p.name}:</strong> {p.tankAmount} ({p.tankBreakdown})</li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Field Quantities ── (own collapsible section, matches src/components/FieldQuantities.tsx) */}
        <div className="mt-4 rounded-lg overflow-hidden border" style={{ borderColor: colors.primary + '30' }}>
          <div className="w-full flex items-center justify-between px-4 py-3" style={{ backgroundColor: colors.primary + '12' }}>
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm" style={{ color: colors.primaryDark }}>Field Quantities</span>
              <span className="hidden sm:flex items-center gap-2 text-xs" style={{ color: colors.primaryDark + 'aa' }}>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '18' }}>240 ac</span>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '18' }}>3600 gal</span>
                <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: colors.primary + '18' }}>4 full + 1 partial</span>
              </span>
            </div>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ color: colors.primaryDark, transform: 'rotate(180deg)' }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
          <div className="p-4 space-y-5">
            {/* What to Buy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.secondary }} />
                <h3 className="font-bold text-sm" style={{ color: colors.primaryDark }}>What to Buy</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map(p => (
                  <div key={`buy-${p.id}`} className="rounded-lg overflow-hidden border" style={{ borderColor: colors.secondary + '80' }}>
                    <div className="px-3 py-2" style={{ backgroundColor: colors.secondary + '25' }}>
                      <p className="font-bold text-sm truncate" style={{ color: colors.primaryDark }}>{p.name}</p>
                      <p className="text-xl font-bold mt-0.5" style={{ color: colors.primaryDark }}>{p.totalBuy}</p>
                    </div>
                    <div className="px-3 py-2 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold" style={{ color: colors.lightText }}>
                          <span className="mr-1" style={{ color: colors.secondary }}>★</span>{p.containerStar}
                        </span>
                        <span className="opacity-60">0% waste</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="opacity-70" style={{ color: colors.lightText }}>{p.containerAlt}</span>
                        <span className="opacity-60">0% waste</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${colors.primary}20` }} />

            {/* Per Mix Amounts */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full" style={{ backgroundColor: colors.primary }} />
                <h3 className="font-bold text-sm" style={{ color: colors.primaryDark }}>Per Mix Amounts</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: colors.primary + '60' }}>
                  <div className="px-3 py-2" style={{ backgroundColor: colors.primary + '15' }}>
                    <p className="font-bold text-sm" style={{ color: colors.primary }}>Full Mix × 4</p>
                    <p className="text-xs opacity-70 mt-0.5">800 gal · 53.33 acres each</p>
                  </div>
                  <div className="px-3 py-2 space-y-1.5">
                    {products.map(p => (
                      <div key={`full-${p.id}`} className="flex items-center justify-between text-sm">
                        <span className="font-medium truncate mr-2" style={{ color: colors.lightText }}>{p.name}</span>
                        <span className="font-bold flex-shrink-0" style={{ color: colors.primaryDark }}>{p.perFull}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border" style={{ borderColor: colors.secondary + '80' }}>
                  <div className="px-3 py-2" style={{ backgroundColor: colors.secondary + '20' }}>
                    <p className="font-bold text-sm" style={{ color: colors.secondaryDark }}>Partial Mix × 1</p>
                    <p className="text-xs opacity-70 mt-0.5">400.0 gal · 26.67 acres</p>
                  </div>
                  <div className="px-3 py-2 space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate mr-2" style={{ color: colors.lightText }}>Roundup PowerMax</span>
                      <span className="font-bold flex-shrink-0" style={{ color: colors.secondaryDark }}>853.33 oz</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium truncate mr-2" style={{ color: colors.lightText }}>2,4-D Amine</span>
                      <span className="font-bold flex-shrink-0" style={{ color: colors.secondaryDark }}>426.67 oz</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Field Operations ── (last section, matches src/App.tsx order) */}
        <div className="p-4 rounded-lg mt-6" style={{ backgroundColor: colors.primaryLight + '15' }}>
          <h2 className="font-bold mb-4" style={{ color: colors.primaryDark }}>Field Operations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <Field label="Field Size (acres)" value={fieldSize} />
            <Field label="Width (feet)" value={implementWidth} />
            <Field label="Speed (mph)" value={speed} />
            <Field label="Fill Time (min)" value={fillTime} />
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'white', borderLeft: `4px solid ${colors.primary}` }}>
            <h3 className="font-bold mb-2" style={{ color: colors.primary }}>Field Operations Estimates</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p>• Working rate: <strong>101.8 acres/hour</strong></p>
              <p>• Effective rate (with filling): <strong>81.1 acres/hour</strong></p>
              <p>• Mixes needed: <strong>5 mixes</strong> (4.5)</p>
              <p>• Total gallons: <strong>3600 gallons</strong></p>
              <p>• Spray time: <strong>2 hr 21 min</strong></p>
              <p>• Total fill time: <strong>0 hr 36 min</strong></p>
              <p>• Estimated job completion time: <strong>2 hr 58 min</strong></p>
              <p>• Estimated completion: <strong>Today at 11:58 AM</strong></p>
            </div>
          </div>
        </div>

        {/* Disclaimer (matches src/App.tsx tail) */}
        <div className="mt-4 text-xs opacity-60" style={{ color: colors.primaryDark }}>
          <p>Always verify calculations against product labels and follow all safety guidelines.</p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1">{label}</label>
      <input readOnly value={value} className="w-full p-3 border rounded-lg text-black text-base" />
    </div>
  );
}

function ProductCardCurrent({ p }: { p: typeof products[0] }) {
  return (
    <div className="p-4 rounded-xl"
      style={{ backgroundColor: 'white', border: `1.5px solid ${colors.primary}30`, boxShadow: `0 2px 8px 0 ${colors.primary}0d, 0 1px 3px 0 rgba(0,0,0,0.05)` }}>
      <div className="flex items-center gap-2 mb-3">
        <input readOnly value={p.name} className="flex-1 min-w-0 px-2.5 py-2 border rounded-lg text-sm font-semibold text-gray-800"
          style={{ borderColor: `${colors.primary}30`, backgroundColor: '#fafafa' }} />
        <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
          style={{ color: colors.primaryLight, border: `1px solid ${colors.primary}25` }}>×</button>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Rate</label>
        <input readOnly value={p.rate} className="w-full px-3 py-2.5 border rounded-lg text-sm font-medium text-gray-800"
          style={{ borderColor: `${colors.primary}30`, backgroundColor: '#fafafa' }} />
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Unit</label>
        <div className="space-y-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${colors.primary}40` }}>
            <button className="flex-1 py-1.5 text-xs font-semibold" style={{ backgroundColor: colors.primary, color: '#fff' }}>/ Acre</button>
            <button className="flex-1 py-1.5 text-xs font-semibold" style={{ backgroundColor: `${colors.primary}10`, color: colors.primaryDark }}>/ 100 gal</button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['oz', 'pt', 'qt', 'gal', 'lb', 'g'].map(u => (
              <button key={u} className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={u === 'oz'
                  ? { backgroundColor: colors.primary, color: '#fff' }
                  : { backgroundColor: `${colors.primary}10`, color: colors.primaryDark, border: `1px solid ${colors.primary}35` }}
              >{u}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-medium mb-1.5 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Jug Size</label>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { label: '2.5 gal', active: p.id === 1 },
            { label: '1 gal', active: p.id === 2 },
            { label: 'Custom', active: false },
          ].map(j => (
            <button key={j.label} className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={j.active
                ? { backgroundColor: colors.primary, color: '#fff' }
                : { backgroundColor: `${colors.primary}10`, color: colors.primaryDark, border: `1px solid ${colors.primary}35` }}
            >{j.label}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Amount for Tank</label>
        <div className="w-full px-3 py-2.5 rounded-lg font-bold text-sm flex items-center justify-between gap-2"
          style={{ backgroundColor: `${colors.primary}12`, border: `1px solid ${colors.primary}35`, color: colors.primaryDark }}>
          <span className="flex flex-col gap-0.5 min-w-0">
            <span>{p.tankAmount}</span>
            <span className="font-normal text-xs leading-tight" style={{ color: `${colors.primaryDark}99` }}>{p.tankBreakdown}</span>
          </span>
          <span className="opacity-40">▾</span>
        </div>
      </div>
    </div>
  );
}
