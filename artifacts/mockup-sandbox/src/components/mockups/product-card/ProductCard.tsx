import { useState } from "react";

const GREEN = "#498a5a";

const UNITS_PER_ACRE = ["oz", "pt", "qt", "gal", "lb", "g"];
const UNITS_PER_100_GAL = ["oz", "pt", "qt", "gal", "lb", "g"];

function computeAmount(
  fillVol: number,
  appRate: number,
  rate: number,
  unit: string,
  mode: "acre" | "100gal"
): string {
  if (!rate || !fillVol || !appRate) return "—";
  const acresPerFill = fillVol / appRate;
  let raw = 0;
  if (mode === "acre") {
    raw = rate * acresPerFill;
  } else {
    raw = (rate / 100) * fillVol;
  }
  const isDry = unit === "lb" || unit === "g";
  if (isDry) {
    if (unit === "g") return `${(raw * 453.592).toFixed(1)} g`;
    return `${raw.toFixed(2)} lb`;
  }
  if (unit === "gal") return `${raw.toFixed(2)} gal`;
  if (unit === "qt") return `${(raw * 4).toFixed(2)} qt`;
  if (unit === "pt") return `${(raw * 8).toFixed(2)} pt`;
  return `${(raw * 128).toFixed(1)} fl oz`;
}

export function ProductCard() {
  const [name, setName] = useState("Glyphosate 41%");
  const [rate, setRate] = useState("32");
  const [mode, setMode] = useState<"acre" | "100gal">("acre");
  const [unit, setUnit] = useState("oz");

  const units = mode === "acre" ? UNITS_PER_ACRE : UNITS_PER_100_GAL;

  const fillVol = 300;
  const appRate = 15;
  const amount = computeAmount(fillVol, appRate, parseFloat(rate) || 0, unit, mode);
  const modeLabel = mode === "acre" ? `/ acre  ·  ${unit}` : `/ 100 gal  ·  ${unit}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div
        className="w-full max-w-sm rounded-2xl bg-white"
        style={{
          border: "1.5px solid #c8e6d0",
          boxShadow: "0 2px 12px 0 rgba(73,138,90,0.08), 0 1px 3px 0 rgba(0,0,0,0.06)",
        }}
      >
        <div className="p-5 space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="w-full text-base font-semibold text-gray-800 bg-transparent border-0 border-b border-gray-200 pb-1 focus:outline-none focus:border-b-2 placeholder-gray-400"
            style={{ borderBottomColor: "#c8e6d0" }}
          />

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
              Rate
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2"
                style={{ focusRingColor: GREEN } as React.CSSProperties}
                min={0}
                step={0.5}
              />
              <span className="text-xs text-gray-500">{modeLabel}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Unit
            </label>

            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: "#c8e6d0" }}>
              {(["acre", "100gal"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setUnit(units[0]);
                  }}
                  className="flex-1 py-1.5 text-xs font-semibold transition-all"
                  style={
                    mode === m
                      ? { backgroundColor: GREEN, color: "#fff" }
                      : { backgroundColor: "#f0f7f2", color: "#498a5a" }
                  }
                >
                  {m === "acre" ? "/ Acre" : "/ 100 gal"}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {units.map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className="rounded-full px-3 py-1 text-xs font-semibold transition-all"
                  style={
                    unit === u
                      ? { backgroundColor: GREEN, color: "#fff" }
                      : {
                          backgroundColor: "#f0f7f2",
                          color: "#498a5a",
                          border: "1px solid #c8e6d0",
                        }
                  }
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#f0f7f2", border: "1px solid #c8e6d0" }}
          >
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Amount for Tank
            </div>
            <div className="text-2xl font-bold" style={{ color: GREEN }}>
              {amount}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {fillVol} gal tank · {appRate} GPA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
