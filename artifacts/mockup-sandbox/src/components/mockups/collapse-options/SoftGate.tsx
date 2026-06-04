import { useState } from 'react';

const c = {
  primary: '#498a5a',
  dark: '#2d6840',
  light: '#76a886',
  bg: 'rgba(73,138,90,0.08)',
  border: 'rgba(73,138,90,0.25)',
  muted: '#7c867c',
};

function MixInfoSection() {
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
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
  );
}

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

export function SoftGate() {
  const [filled, setFilled] = useState(true);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#f4f6f3', minHeight: '100vh', padding: 0 }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '14px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>
          <span style={{ color: '#1c291f' }}>Spray</span><span style={{ color: c.primary }}>Calc</span>
        </span>
        <div style={{ display: 'flex', gap: 12, borderBottom: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.dark, paddingBottom: 2, borderBottom: `2.5px solid ${c.primary}` }}>Tank Mix</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.muted, paddingBottom: 2 }}>Field Mix</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <MixInfoSection />

        {/* Products section */}
        <div style={{ position: 'relative' }}>
          {/* Gate overlay */}
          {!filled && (
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 12, zIndex: 10,
              background: 'rgba(244,246,243,0.82)', backdropFilter: 'blur(2px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
              <div style={{ fontSize: 22 }}>🔒</div>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.dark, textAlign: 'center' }}>Fill in Mix Information above</p>
              <p style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>Set fill volume and application rate first</p>
            </div>
          )}

          <div style={{ opacity: filled ? 1 : 0.35, transition: 'opacity 250ms' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: c.dark }}>Products</p>
              <button style={{
                background: filled ? c.primary : '#ccc', color: 'white', border: 'none',
                borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600,
                cursor: filled ? 'pointer' : 'not-allowed'
              }}>+ Add Product</button>
            </div>
            <ProductRow name="Roundup PowerMax" amount="46.2 oz" />
            <ProductRow name="Atrazine 4L" amount="32.0 oz" />
          </div>
        </div>

        {/* Toggle for demo */}
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px dashed ${c.border}` }}>
          <p style={{ fontSize: 11, color: c.muted, marginBottom: 8, textAlign: 'center' }}>Demo toggle</p>
          <button
            onClick={() => setFilled(f => !f)}
            style={{ width: '100%', padding: '8px', borderRadius: 8, border: `1px solid ${c.border}`, background: 'white', fontSize: 12, color: c.dark, cursor: 'pointer', fontWeight: 500 }}
          >
            {filled ? 'Simulate: clear mix info → gate closes' : 'Simulate: fill mix info → gate opens'}
          </button>
        </div>
      </div>
    </div>
  );
}
