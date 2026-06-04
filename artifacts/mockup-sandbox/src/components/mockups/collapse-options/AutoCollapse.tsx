import { useState } from 'react';

const c = {
  primary: '#498a5a',
  dark: '#2d6840',
  light: '#76a886',
  bg: 'rgba(73,138,90,0.08)',
  border: 'rgba(73,138,90,0.25)',
  muted: '#7c867c',
};

function ProductRow({ name, amount }: { name: string; amount: string }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: 10, padding: '12px 14px', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: c.dark }}>{name}</p>
        <p style={{ fontSize: 12, color: c.muted }}>2 qt/ac · liquid</p>
      </div>
      <p style={{ fontSize: 16, fontWeight: 700, color: c.primary }}>{amount}</p>
    </div>
  );
}

export function AutoCollapse() {
  const [scrolledPast, setScrolledPast] = useState(false);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#f4f6f3', minHeight: '100vh', padding: 0, position: 'relative' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: `1px solid ${c.border}`, position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            <span style={{ color: '#1c291f' }}>Spray</span><span style={{ color: c.primary }}>Calc</span>
          </span>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.dark, paddingBottom: 2, borderBottom: `2.5px solid ${c.primary}` }}>Tank Mix</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.muted }}>Field Mix</span>
          </div>
        </div>

        {/* Sticky summary strip — appears when scrolled past mix info */}
        <div style={{
          overflow: 'hidden',
          maxHeight: scrolledPast ? 38 : 0,
          transition: 'max-height 280ms ease',
          borderTop: scrolledPast ? `1px solid ${c.border}` : 'none',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '7px 16px',
            background: c.bg,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: c.light, marginRight: 4 }}>Mix</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.dark }}>300 gal</span>
              <span style={{ color: c.muted, fontSize: 11 }}>·</span>
              <span style={{ fontSize: 13, color: c.dark }}>15 GPA</span>
              <span style={{ color: c.muted, fontSize: 11 }}>·</span>
              <span style={{ fontSize: 13, color: c.dark }}>20 ac/fill</span>
            </div>
            <button
              onClick={() => setScrolledPast(false)}
              style={{ fontSize: 11, fontWeight: 500, color: c.primary, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Edit ↑
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Mix Info — collapses out when scrolled past */}
        <div style={{
          background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12,
          overflow: 'hidden', marginBottom: 16,
          maxHeight: scrolledPast ? 0 : 200,
          opacity: scrolledPast ? 0 : 1,
          marginTop: scrolledPast ? -16 : 0,
          transition: 'max-height 300ms ease, opacity 250ms ease, margin 300ms ease',
        }}>
          <div style={{ padding: '14px 16px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.dark, marginBottom: 10 }}>Mix Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[['Fill Volume (gal)', '300'], ['App Rate (GPA)', '15'], ['Acres / Fill', '20']].map(([label, val]) => (
                <div key={label}>
                  <p style={{ fontSize: 11, color: c.muted, marginBottom: 4 }}>{label}</p>
                  <div style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 10px', fontSize: 14, color: '#1c291f', fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: c.dark }}>Products</p>
          <button style={{ background: c.primary, color: 'white', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add Product</button>
        </div>
        <ProductRow name="Roundup PowerMax" amount="46.2 oz" />
        <ProductRow name="Atrazine 4L" amount="32.0 oz" />

        {/* Simulate scroll toggle */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${c.border}` }}>
          <p style={{ fontSize: 11, color: c.muted, marginBottom: 8, textAlign: 'center' }}>Demo toggle</p>
          <button
            onClick={() => setScrolledPast(s => !s)}
            style={{ width: '100%', padding: '8px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'white', fontSize: 12, color: c.dark, cursor: 'pointer', fontWeight: 500 }}
          >
            {scrolledPast ? '↑ Scroll back up — expand section' : '↓ Scroll past — auto-collapse + sticky bar'}
          </button>
        </div>
      </div>
    </div>
  );
}
