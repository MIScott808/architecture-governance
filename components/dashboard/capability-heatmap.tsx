'use client';

import { APQC_PCF_LEVEL1 } from '@/lib/utils/pcf';
import type { CapabilityMapEntry } from '@/lib/types/capabilities';

interface CapabilityHeatmapProps {
  capabilities: CapabilityMapEntry[];
}

const maturityColors: Record<string, string> = {
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  green: 'bg-emerald-500',
};

const maturityBg: Record<string, string> = {
  red: 'bg-red-50 border-red-200',
  yellow: 'bg-yellow-50 border-yellow-200',
  green: 'bg-emerald-50 border-emerald-200',
};

export default function CapabilityHeatmap({ capabilities }: CapabilityHeatmapProps) {
  if (capabilities.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        No capabilities mapped yet. Add capabilities to see the heatmap.
      </div>
    );
  }

  // Group capabilities by PCF L1 category
  const grouped = APQC_PCF_LEVEL1.map((cat) => {
    const catNumber = cat.pcfId.replace('.0', '');
    const caps = capabilities.filter((c) => {
      const capNumber = c.pcfId.split('.')[0];
      return capNumber === catNumber;
    });
    const avgMaturity = caps.length > 0
      ? caps.reduce((sum, c) => sum + (c.maturityScore ?? 0), 0) / caps.length
      : null;
    const dominantMaturity = caps.length > 0
      ? getMostCommon(caps.map((c) => c.maturityCurrent).filter(Boolean) as string[])
      : null;
    return { ...cat, caps, avgMaturity, dominantMaturity };
  });

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
      {grouped.map((cat) => (
        <div
          key={cat.pcfId}
          className={`rounded-lg border p-2 text-center transition-colors ${
            cat.dominantMaturity
              ? maturityBg[cat.dominantMaturity]
              : 'bg-slate-50 border-slate-200'
          }`}
          title={`${cat.name} — ${cat.caps.length} capabilities`}
        >
          <div className="text-xs font-bold text-slate-500 mb-1">{cat.pcfId}</div>
          <div className="flex justify-center mb-1">
            {cat.dominantMaturity ? (
              <span className={`w-4 h-4 rounded-full ${maturityColors[cat.dominantMaturity]}`} />
            ) : (
              <span className="w-4 h-4 rounded-full bg-slate-200" />
            )}
          </div>
          <div className="text-[9px] text-slate-600 leading-tight line-clamp-2">
            {cat.name}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {cat.caps.length} cap{cat.caps.length !== 1 ? 's' : ''}
          </div>
        </div>
      ))}
    </div>
  );
}

function getMostCommon(arr: string[]): string | null {
  if (arr.length === 0) return null;
  const freq: Record<string, number> = {};
  arr.forEach((v) => { freq[v] = (freq[v] || 0) + 1; });
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}
