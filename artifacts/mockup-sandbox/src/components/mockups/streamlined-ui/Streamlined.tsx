import { useState } from 'react';
import './_group.css';
import { colors } from '@app/types';

const products = [
  { id: 1, name: 'Roundup PowerMax', rate: 32, unit: 'oz/ac',  jug: '2.5 gal', tankPrimary: '1706.67 oz', tankSub: '5 jugs + 106.67 oz', totalBuy: '60 gal', container: '24 × 2.5 gal jugs' },
  { id: 2, name: '2,4-D Amine',     rate: 16, unit: 'oz/ac',  jug: '1 gal',   tankPrimary: '853.33 oz',  tankSub: '6 jugs + 85.33 oz',  totalBuy: '30 gal', container: '30 × 1 gal jugs' },
];

export function Streamlined() {
  const [eqOpen, setEqOpen] = useState(false);
  const [advOpen, setAdvOpen] = useState<number | null>(null);

  return (
    <div className="spray-calc-root min-h-screen p-4" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-5 gap-2">
          <h1 className="text-xl font-bold whitespace-nowrap" style={{ color: colors.primary }}>Spray Calc</h1>
          <div className="flex items-center gap-2">
            <button className="h-9 px-3 rounded-lg text-sm font-medium"
              style={{ backgroundColor: 'transparent', color: colors.primaryDark, border: `1px solid ${colors.primary}50` }}>Clear</button>
            <button className="h-9 px-4 rounded-lg text-sm font-medium text-white"
              style={{ backgroundColor: colors.primary }}>Save Mix</button>
            <button className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ color: colors.primaryDark }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
              </svg>
            </button>
          </div>
        </div>


        <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}25` }}>
          <h2 className="font-bold mb-3 text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>Setup</h2>


          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-4 text-base" style={{ color: colors.lightText }}>
            <InlineNumber value="800" suffix="gal mix" />
            <span style={{ color: `${colors.lightText}80` }}>at</span>
            <InlineNumber value="15" suffix="GPA" />
            <span className="px-2 py-1 rounded-md text-sm font-semibold"
              style={{ backgroundColor: `${colors.primary}12`, color: colors.primaryDark }}>→ 53.33 ac/fill</span>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Field Size</label>
              <div className="flex">
                <input readOnly value="240" className="w-full p-2.5 border rounded-l-lg text-gray-800 text-base"
                  style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }} />
                <span className="px-3 flex items-center text-sm font-medium border border-l-0 rounded-r-lg"
                  style={{ borderColor: `${colors.primary}30`, backgroundColor: `${colors.primary}10`, color: colors.primaryDark }}>acres</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>Display Amounts As</label>
              <div className="w-full p-2.5 border rounded-lg text-gray-800 text-base flex items-center justify-between cursor-pointer"
                style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }}>
                <span>Auto (Default)</span>
                <span className="opacity-40">▾</span>
              </div>
            </div>
          </div>


          <button onClick={() => setEqOpen(!eqOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wide py-2 px-3 rounded-lg"
            style={{ color: colors.primaryDark, backgroundColor: `${colors.primary}10`, border: `1px solid ${colors.primary}25` }}>
            <span>Equipment & Timing  <span className="font-normal lowercase" style={{ color: `${colors.lightText}80` }}>· 70 ft · 12 mph · 8 min fill</span></span>
            <span style={{ transform: eqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
          </button>
          {eqOpen && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              <CompactField label="Width (ft)" value="70" />
              <CompactField label="Speed (mph)" value="12" />
              <CompactField label="Fill (min)" value="8" />
            </div>
          )}
        </div>


        <div className="p-4 rounded-xl mb-5" style={{ backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}25` }}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: colors.primaryDark }}>Products</h2>
            <button className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: colors.primary }}>+ Add</button>
          </div>
          <div className="space-y-2.5">
            {products.map(p => (
              <CompactProductCard
                key={p.id}
                p={p}
                advOpen={advOpen === p.id}
                onToggleAdv={() => setAdvOpen(advOpen === p.id ? null : p.id)}
              />
            ))}
          </div>
        </div>


        <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${colors.primary}40`, backgroundColor: 'white' }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: `${colors.secondaryLight}30` }}>
            <div>
              <h2 className="font-bold text-base" style={{ color: colors.primaryDark }}>Results — 240 ac field</h2>
              <p className="text-xs" style={{ color: `${colors.lightText}99` }}>800 gal mix · 15 GPA · 5 mixes (4 full + 1 partial) · ETA Today 11:58 AM</p>
            </div>
            <ShareMenu />
          </div>

          <div className="p-4 space-y-4">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: colors.primaryDark }}>For one 800 gal tank</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {products.map(p => (
                  <div key={`tank-${p.id}`} className="rounded-lg px-3 py-2"
                    style={{ backgroundColor: `${colors.primary}10`, border: `1px solid ${colors.primary}25` }}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold text-sm truncate" style={{ color: colors.lightText }}>{p.name}</span>
                      <span className="font-bold text-sm" style={{ color: colors.primaryDark }}>{p.tankPrimary}</span>
                    </div>
                    <div className="text-xs" style={{ color: `${colors.lightText}80` }}>{p.tankSub}</div>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: colors.secondary }} />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.primaryDark }}>What to Buy</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {products.map(p => (
                  <div key={`buy-${p.id}`} className="rounded-lg px-3 py-2 flex items-baseline justify-between gap-2"
                    style={{ backgroundColor: `${colors.secondary}18`, border: `1px solid ${colors.secondary}55` }}>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: colors.primaryDark }}>{p.name}</p>
                      <p className="text-xs" style={{ color: `${colors.lightText}80` }}>★ {p.container}</p>
                    </div>
                    <span className="font-bold text-base whitespace-nowrap" style={{ color: colors.primaryDark }}>{p.totalBuy}</span>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: colors.primary }} />
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: colors.primaryDark }}>Field Operations</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Stat label="Total spray" value="3,600 gal" />
                <Stat label="Working rate" value="101.8 ac/hr" />
                <Stat label="Spray time" value="2 hr 21 min" />
                <Stat label="Job time" value="2 hr 58 min" />
              </div>
            </div>


            <details className="rounded-lg" style={{ border: `1px solid ${colors.primary}20` }}>
              <summary className="cursor-pointer px-3 py-2 text-xs font-semibold uppercase tracking-wide flex items-center justify-between"
                style={{ color: colors.primaryDark, backgroundColor: `${colors.primary}08` }}>
                <span>Per-mix breakdown · 4 full + 1 partial (400 gal)</span>
                <span style={{ color: `${colors.lightText}80` }}>show</span>
              </summary>
              <div className="px-3 py-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="rounded p-2" style={{ backgroundColor: `${colors.primary}08` }}>
                  <p className="font-bold text-xs mb-1" style={{ color: colors.primary }}>Full Mix × 4 (800 gal)</p>
                  {products.map(p => (
                    <div key={`f-${p.id}`} className="flex justify-between"><span>{p.name}</span><span className="font-semibold" style={{ color: colors.primaryDark }}>{p.tankPrimary}</span></div>
                  ))}
                </div>
                <div className="rounded p-2" style={{ backgroundColor: `${colors.secondary}15` }}>
                  <p className="font-bold text-xs mb-1" style={{ color: colors.secondaryDark }}>Partial × 1 (400 gal · 26.67 ac)</p>
                  <div className="flex justify-between"><span>Roundup PowerMax</span><span className="font-semibold" style={{ color: colors.secondaryDark }}>853.33 oz</span></div>
                  <div className="flex justify-between"><span>2,4-D Amine</span><span className="font-semibold" style={{ color: colors.secondaryDark }}>426.67 oz</span></div>
                </div>
              </div>
            </details>
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: `${colors.lightText}66` }}>
          Streamlined: 1 setup panel · compact rows with on-demand jug/format · merged Results
        </p>
      </div>
    </div>
  );
}

function InlineNumber({ value, suffix }: { value: string; suffix: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md"
      style={{ backgroundColor: 'white', border: `1px solid ${colors.primary}30` }}>
      <input readOnly value={value} className="w-14 text-right font-semibold text-base bg-transparent focus:outline-none" />
      <span className="text-sm" style={{ color: `${colors.lightText}99` }}>{suffix}</span>
    </span>
  );
}

function CompactField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: `${colors.lightText}80` }}>{label}</label>
      <input readOnly value={value} className="w-full p-2 border rounded-lg text-sm text-gray-800"
        style={{ borderColor: `${colors.primary}30`, backgroundColor: 'white' }} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg px-2.5 py-1.5" style={{ backgroundColor: `${colors.primary}08`, border: `1px solid ${colors.primary}20` }}>
      <p className="text-[11px] uppercase tracking-wide" style={{ color: `${colors.lightText}80` }}>{label}</p>
      <p className="font-bold text-sm" style={{ color: colors.primaryDark }}>{value}</p>
    </div>
  );
}

function ShareMenu() {
  return (
    <div className="relative">
      <button className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
        style={{ backgroundColor: colors.primary, color: 'white' }}>
        Share <span style={{ opacity: 0.8 }}>▾</span>
      </button>

      <div className="absolute right-0 mt-1.5 rounded-lg overflow-hidden shadow-md text-xs z-10"
        style={{ backgroundColor: 'white', border: `1px solid ${colors.primary}30`, minWidth: 140 }}>
        <div className="px-3 py-2 hover:bg-gray-50" style={{ color: colors.lightText }}>Copy summary</div>
        <div className="px-3 py-2 hover:bg-gray-50" style={{ color: colors.lightText, borderTop: `1px solid ${colors.primary}15` }}>Share…</div>
        <div className="px-3 py-2 hover:bg-gray-50" style={{ color: colors.lightText, borderTop: `1px solid ${colors.primary}15` }}>Export PDF</div>
      </div>
    </div>
  );
}

function CompactProductCard({
  p, advOpen, onToggleAdv,
}: {
  p: typeof products[0];
  advOpen: boolean;
  onToggleAdv: () => void;
}) {
  return (
    <div className="rounded-lg p-3"
      style={{ backgroundColor: 'white', border: `1px solid ${colors.primary}30`, boxShadow: `0 1px 2px rgba(0,0,0,0.04)` }}>

      <div className="flex items-center gap-2 mb-2">
        <input readOnly value={p.name}
          className="flex-1 min-w-0 px-2 py-1.5 border rounded-md text-sm font-semibold text-gray-800"
          style={{ borderColor: `${colors.primary}25`, backgroundColor: '#fafafa' }} />
        <button className="w-7 h-7 flex items-center justify-center rounded-md text-sm"
          style={{ color: colors.primaryLight, border: `1px solid ${colors.primary}25` }}>×</button>
      </div>


      <div className="flex flex-wrap items-center gap-2">
        <input readOnly value={p.rate}
          className="w-16 px-2 py-1.5 border rounded-md text-sm font-medium text-gray-800 text-right"
          style={{ borderColor: `${colors.primary}25`, backgroundColor: '#fafafa' }} />
        <button className="px-2 py-1.5 border rounded-md text-sm flex items-center gap-1"
          style={{ borderColor: `${colors.primary}25`, color: colors.primaryDark, backgroundColor: 'white' }}>
          {p.unit} <span className="opacity-50 text-xs">▾</span>
        </button>
        <span className="text-xs" style={{ color: `${colors.lightText}66` }}>=</span>
        <div className="flex-1 min-w-[180px] px-2.5 py-1.5 rounded-md text-sm font-bold flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5"
          style={{ backgroundColor: `${colors.primary}12`, color: colors.primaryDark, border: `1px solid ${colors.primary}25` }}>
          <span className="truncate">{p.tankPrimary}</span>
          <span className="text-[11px] font-normal opacity-70">{p.tankSub}</span>
        </div>
      </div>


      <button onClick={onToggleAdv}
        className="mt-2 text-xs font-medium flex items-center gap-1"
        style={{ color: colors.primaryLight }}>
        <span style={{ display: 'inline-block', transform: advOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .15s' }}>▸</span>
        Advanced — Jug size: {p.jug} · Display: Auto
      </button>
      {advOpen && (
        <div className="mt-2 p-2 rounded-md grid grid-cols-2 gap-2"
          style={{ backgroundColor: `${colors.primary}06`, border: `1px solid ${colors.primary}15` }}>
          <div>
            <p className="text-[11px] uppercase tracking-wide mb-1" style={{ color: `${colors.lightText}80` }}>Jug Size</p>
            <div className="flex flex-wrap gap-1">
              {['2.5 gal', '1 gal', 'Custom'].map(j => (
                <button key={j}
                  className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                  style={p.jug === j
                    ? { backgroundColor: colors.primary, color: '#fff' }
                    : { backgroundColor: `${colors.primary}10`, color: colors.primaryDark, border: `1px solid ${colors.primary}30` }}
                >{j}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide mb-1" style={{ color: `${colors.lightText}80` }}>Display Override</p>
            <div className="px-2 py-1 border rounded text-xs flex items-center justify-between"
              style={{ borderColor: `${colors.primary}25`, backgroundColor: 'white' }}>
              <span>Use global (Auto)</span>
              <span className="opacity-40">▾</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
