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

export function DoneButton() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', background: '#f4f6f3', minHeight: '100vh', padding: 0 }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '14px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 20, fontWeight: 700 }}>
          <span style={{ color: '#1c291f' }}>Spray</span><span style={{ color: c.primary }}>Calc</span>
        </span>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.dark, paddingBottom: 2, borderBottom: `2.5px solid ${c.primary}` }}>Tank Mix</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.muted }}>Field Mix</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* Mix Info Section */}
        <div style={{
          background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12,
          overflow: 'hidden', marginBottom: 16,
          transition: 'all 300ms ease',
        }}>
          {collapsed ? (
            /* Collapsed summary row */
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: c.primary }}>✓</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.dark }}>300 gal</span>
                <span style={{ fontSize: 12, color: c.muted }}>·</span>
                <span style={{ fontSize: 13, color: c.dark }}>15 GPA</span>
                <span style={{ fontSize: 12, color: c.muted }}>·</span>
                <span style={{ fontSize: 13, color: c.dark }}>20 ac/fill</span>
              </div>
              <button
                onClick={() => setCollapsed(false)}
                style={{ fontSize: 12, fontWeight: 500, color: c.primary, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
              >
                Edit
              </button>
            </div>
          ) : (
            /* Expanded form */
            <div style={{ padding: '14px 16px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.dark, marginBottom: 10 }}>Mix Information</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                {[['Fill Volume (gal)', '300'], ['App Rate (GPA)', '15'], ['Acres / Fill', '20']].map(([label, val]) => (
                  <div key={label}>
                    <p style={{ fontSize: 11, color: c.muted, marginBottom: 4 }}>{label}</p>
                    <div style={{ background: 'white', border: `1px solid ${c.border}`, borderRadius: 8, padding: '8px 10px', fontSize: 14, color: '#1c291f', fontWeight: 500 }}>{val}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setCollapsed(true)}
                style={{
                  width: '100%', padding: '9px', borderRadius: 9,
                  background: c.primary, color: 'white', border: 'none',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}
              >
                <span>Done</span>
                <span style={{ fontSize: 15 }}>✓</span>
              </button>
            </div>
          )}
        </div>

        {/* Products always accessible */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: c.dark }}>Products</p>
          <button style={{ background: c.primary, color: 'white', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add Product</button>
        </div>
        <ProductRow name="Roundup PowerMax" amount="46.2 oz" />
        <ProductRow name="Atrazine 4L" amount="32.0 oz" />
      </div>
    </div>
  );
}
