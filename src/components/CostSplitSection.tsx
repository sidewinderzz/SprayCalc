import React from 'react';
import { MixSplit, Product, colors, SUPPLIED_BY_EACH } from '../types';
import {
  buildCostSplit,
  makeSplitId,
  splitDisplayName,
  totalSplitAcres,
} from '../utils/costSplit';
import { displayProductName } from '../utils/productName';

interface CostSplitSectionProps {
  products: Product[];
  splits: MixSplit[];
  setSplits: (splits: MixSplit[]) => void;
  onProductChange: (id: number, field: string, value: string | number) => void;
  applicationRate: number;
  fieldSize: number;
  setFieldSize: (acres: number) => void;
  showCostSplit: boolean;
  setShowCostSplit: (val: boolean) => void;
}

export function CostSplitSection({
  products,
  splits,
  setSplits,
  onProductChange,
  applicationRate,
  fieldSize,
  setFieldSize,
  showCostSplit,
  setShowCostSplit,
}: CostSplitSectionProps) {
  const report = buildCostSplit(products, splits, applicationRate);
  const splitAcres = totalSplitAcres(splits);
  // Only worth flagging once the acreage is actually entered, and only when
  // it differs by more than a rounding wobble.
  const acresMismatch =
    splitAcres > 0 && fieldSize > 0 && Math.abs(splitAcres - fieldSize) > 0.01;

  const addSplit = () => {
    setSplits([...splits, { id: makeSplitId(), name: '', acres: 0 }]);
  };

  const updateSplit = (id: string, patch: Partial<MixSplit>) => {
    setSplits(splits.map(s => (s.id === id ? { ...s, ...patch } : s)));
  };

  const removeSplit = (id: string) => {
    setSplits(splits.filter(s => s.id !== id));
    // Any product furnished by the departing party falls back to "each pays
    // their own" so the ledger never points at a party that isn't there.
    products.forEach(p => {
      if (p.suppliedBy === id) onProductChange(p.id, 'suppliedBy', SUPPLIED_BY_EACH);
    });
  };

  const inputStyle = {
    borderColor: `${colors.primary}30`,
    backgroundColor: 'white',
  };

  return (
    <div
      data-tour-id="cost-split"
      className="rounded-xl overflow-hidden border mb-6"
      style={{ borderColor: colors.primary + '25' }}
    >
      <button
        onClick={() => setShowCostSplit(!showCostSplit)}
        className="w-full flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: colors.primary + '08' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="font-bold text-sm uppercase tracking-wide whitespace-nowrap"
            style={{ color: colors.primaryDark }}
          >
            Cost Split
          </span>
          <span
            className="hidden sm:flex items-center gap-2 text-xs"
            style={{ color: colors.primaryDark + 'aa' }}
          >
            {report ? (
              <>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.primary + '12' }}
                >
                  {report.parties.length} parties
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.primary + '12' }}
                >
                  {report.totalAcres.toFixed(1)} ac
                </span>
              </>
            ) : (
              <span className="opacity-80">Share one load between clients</span>
            )}
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            color: colors.primaryDark,
            transform: showCostSplit ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {showCostSplit && (
        <div className="p-4">
          <p className="text-sm mb-4" style={{ color: `${colors.lightText}b0` }}>
            Mixing one load for more than one field? List each party and their acres.
            Every product is divided by acreage, and you can mark who furnished each
            chemical so the settle-up is clear.
          </p>

          {/* ── Parties ─────────────────────────────────────────────── */}
          <div className="space-y-2">
            {splits.map((split, idx) => (
              <div key={split.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={split.name}
                  onChange={e => updateSplit(split.id, { name: e.target.value })}
                  placeholder={`Party ${idx + 1} (e.g. Smith Farms)`}
                  className="flex-1 min-w-0 p-2.5 border rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2"
                  style={inputStyle}
                  aria-label={`Party ${idx + 1} name`}
                />
                <div className="relative flex-shrink-0" style={{ width: '7.5rem' }}>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={split.acres || ''}
                    onChange={e =>
                      updateSplit(split.id, { acres: parseFloat(e.target.value) || 0 })
                    }
                    placeholder="0"
                    className="w-full p-2.5 pr-9 border rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2"
                    style={inputStyle}
                    aria-label={`${splitDisplayName(split, idx)} acres`}
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
                    style={{ color: `${colors.lightText}70` }}
                  >
                    ac
                  </span>
                </div>
                <button
                  onClick={() => removeSplit(split.id)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-red-50 hover:text-red-600"
                  style={{ color: colors.primaryLight }}
                  title={`Remove ${splitDisplayName(split, idx)}`}
                  aria-label={`Remove ${splitDisplayName(split, idx)}`}
                >
                  <svg
                    viewBox="0 0 14 14"
                    width="11"
                    height="11"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={addSplit}
              className="px-3 py-2 rounded-lg text-sm font-medium"
              style={{
                backgroundColor: `${colors.primary}12`,
                color: colors.primaryDark,
                border: `1px solid ${colors.primary}30`,
              }}
            >
              + Add party
            </button>
            {splitAcres > 0 && (
              <span className="text-sm" style={{ color: colors.lightText }}>
                Split total:{' '}
                <strong style={{ color: colors.primaryDark }}>
                  {splitAcres.toFixed(2)} ac
                </strong>
              </span>
            )}
          </div>

          {acresMismatch && (
            <div
              className="mt-3 p-3 rounded-lg text-sm flex flex-wrap items-center gap-x-3 gap-y-2"
              style={{
                backgroundColor: `${colors.secondary}20`,
                border: `1px solid ${colors.secondary}60`,
                color: colors.lightText,
              }}
            >
              <span>
                Parties add up to <strong>{splitAcres.toFixed(2)} ac</strong> but the job
                is set to <strong>{fieldSize} ac</strong>.
              </span>
              <button
                onClick={() => setFieldSize(parseFloat(splitAcres.toFixed(2)))}
                className="px-2.5 py-1 rounded-md text-xs font-semibold"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                Use {splitAcres.toFixed(2)} ac
              </button>
            </div>
          )}

          {/* ── Who furnished what ──────────────────────────────────── */}
          {splits.length > 0 && products.length > 0 && (
            <div className="mt-5">
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: colors.primaryLight }}
              >
                Who supplies each chemical
              </p>
              <div className="space-y-2">
                {products.map((product, idx) => (
                  <div
                    key={`supplier-${product.id}`}
                    className="flex items-center gap-2 flex-wrap"
                  >
                    <span
                      className="flex-1 min-w-0 truncate text-sm font-medium"
                      style={{ color: colors.lightText }}
                    >
                      {displayProductName(product.name, idx)}
                    </span>
                    <select
                      value={product.suppliedBy ?? SUPPLIED_BY_EACH}
                      onChange={e =>
                        onProductChange(product.id, 'suppliedBy', e.target.value)
                      }
                      className="flex-shrink-0 p-2 border rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2"
                      style={{ ...inputStyle, maxWidth: '16rem' }}
                      aria-label={`Who supplies ${displayProductName(product.name, idx)}`}
                    >
                      <option value={SUPPLIED_BY_EACH}>Each pays their own</option>
                      {splits.map((split, sIdx) => (
                        <option key={split.id} value={split.id}>
                          Supplied by {splitDisplayName(split, sIdx)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Breakdown ───────────────────────────────────────────── */}
          {report ? (
            <>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.parties.map(party => (
                  <div
                    key={party.split.id}
                    className="rounded-lg overflow-hidden border bg-white"
                    style={{ borderColor: colors.primary + '25' }}
                  >
                    <div
                      className="px-3 py-2"
                      style={{ backgroundColor: colors.primary + '0d' }}
                    >
                      <p
                        className="text-sm font-bold truncate"
                        style={{ color: colors.primaryDark }}
                      >
                        {party.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: `${colors.lightText}cc` }}
                      >
                        {party.split.acres} ac · {(party.fraction * 100).toFixed(0)}% of
                        load · {party.gallons.toFixed(1)} gal
                      </p>
                    </div>
                    <div className="px-3 py-2 space-y-1.5">
                      {party.lines.map(line => (
                        <div
                          key={line.productId}
                          className="flex items-start justify-between gap-2 text-sm"
                        >
                          <span className="min-w-0" style={{ color: colors.lightText }}>
                            <span className="font-medium">{line.name}</span>
                            {line.suppliedByName && (
                              <span
                                className="block text-xs"
                                style={{ color: `${colors.lightText}90` }}
                              >
                                {line.isSupplier
                                  ? `supplies all ${line.furnishedDisplay}`
                                  : `owed to ${line.suppliedByName}`}
                              </span>
                            )}
                          </span>
                          <span
                            className="font-bold flex-shrink-0 text-right"
                            style={{ color: colors.primaryDark }}
                          >
                            {line.display}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {report.settlements.length > 0 && (
                <div
                  className="mt-4 p-3 rounded-lg"
                  style={{
                    backgroundColor: `${colors.secondary}18`,
                    border: `1px solid ${colors.secondary}55`,
                  }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: colors.secondaryDark }}
                  >
                    Settle up
                  </p>
                  <ul className="space-y-1">
                    {report.settlements.map((s, i) => (
                      <li key={i} className="text-sm" style={{ color: colors.lightText }}>
                        <strong>{s.toName}</strong> owes <strong>{s.fromName}</strong>{' '}
                        <strong style={{ color: colors.primaryDark }}>{s.display}</strong>{' '}
                        of {s.productName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            splits.length > 0 && (
              <p className="mt-4 text-sm" style={{ color: `${colors.lightText}90` }}>
                Enter acres for at least two parties (and an application rate) to see the
                breakdown.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
