import React from 'react';
import { colors } from '../types';

interface TipsSectionProps {
  show: boolean;
  onClose: () => void;
}

export function TipsSection({ show, onClose }: TipsSectionProps) {
  if (!show) return null;

  return (
    <div
      className="p-4 rounded-lg mb-6 border-2"
      style={{
        backgroundColor: colors.secondary + '10',
        borderColor: colors.secondary
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold" style={{color: colors.primaryDark}}>
          How to Use This Calculator
        </h2>
        <button
          onClick={onClose}
          className="text-lg px-2 py-1 rounded hover:bg-gray-200 min-w-[36px] min-h-[36px]"
          title="Close tips"
        >
          <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Getting Started</h3>
            <div className="space-y-2 text-sm">
              <p><strong>1. Set your mix info:</strong> Enter your fill volume (how much spray you're making) and application rate (GPA)</p>
              <p><strong>2. Add products:</strong> Click "+ Add Product" and enter each chemical's rate and unit</p>
              <p><strong>3. Enter field size:</strong> Add your field acreage to get purchase planning and mix breakdowns</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Smart Features</h3>
            <div className="space-y-2 text-sm">
              <p><strong>• Smart suggestions:</strong> Get fill volume recommendations based on your field size</p>
              <p><strong>• Mix planning:</strong> See exactly how many full mixes + partial mixes you need</p>
              <p><strong>• Purchase optimization:</strong> Get container suggestions to minimize waste</p>
              <p><strong>• Field timing:</strong> Calculate spray time and completion estimates</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Key Features</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Product Quantities:</strong> Shows total products to buy AND exact amounts for each mix</p>
              <p><strong>Partial mixes:</strong> Calculates reduced chemical amounts for remaining acres</p>
              <p><strong>Multiple formats:</strong> Click any amount to change display units (oz, gal, qt, etc.)</p>
              <p><strong>Field operations:</strong> Enter implement width, speed, and fill time for job estimates</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2" style={{color: colors.primary}}>Pro Tips</h3>
            <div className="space-y-2 text-sm">
              <p><strong>• Save mixes:</strong> Click "Save Mix" to save a named mix for quick recall from the ⋮ menu</p>
              <p><strong>• Copy summary:</strong> Click the clipboard icon to copy all info to share or print</p>
              <p><strong>• Fill volume strategy:</strong> For small fields, use exact spray amount. For large fields, use consistent fill volumes</p>
              <p><strong>• Rate units:</strong> Use "/acre" for per-acre rates or "per X gal" for concentration rates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded" style={{backgroundColor: 'white', border: `1px solid ${colors.primary}30`}}>
        <h3 className="font-bold text-lg mb-3" style={{color: colors.primary}}>Example Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2" style={{color: colors.primaryDark}}>Small Field (5 acres):</h4>
            <p>• 10 GPA rate = 50 gallons total needed</p>
            <p>• Suggestion: Use 50-gallon fill (1 mix)</p>
            <p>• Perfect - no waste, no partial mix</p>
          </div>
          <div>
            <h4 className="font-medium mb-2" style={{color: colors.primaryDark}}>Large Field (45 acres):</h4>
            <p>• 15 GPA rate = 675 gallons total needed</p>
            <p>• Suggestion: Use 100-gallon fills</p>
            <p>• Result: 6 full mixes + 1 partial (75 gal)</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 rounded text-center text-sm" style={{backgroundColor: colors.primaryLight + '20'}}>
        <p><strong>Remember:</strong> Always verify calculations against product labels and follow all safety guidelines. This calculator is a planning tool - use your professional judgment!</p>
      </div>
    </div>
  );
}
