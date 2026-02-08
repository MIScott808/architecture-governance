'use client';

import { useState, useEffect } from 'react';
import { Map } from 'lucide-react';
import { APQC_PCF_LEVEL1 } from '@/lib/utils/pcf';
import type { CapabilityMapEntry } from '@/lib/types/capabilities';
import { dbCapabilityToCapability } from '@/lib/types/capabilities';
import MaturityIndicator from '@/components/shared/maturity-indicator';

export default function CapabilitiesPage() {
  const [capabilities, setCapabilities] = useState<CapabilityMapEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCapabilities() {
      try {
        const res = await fetch('/api/capabilities');
        const data = await res.json();
        setCapabilities(
          (data.capabilities || []).map((c: Record<string, unknown>) =>
            dbCapabilityToCapability(c)
          )
        );
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchCapabilities();
  }, []);

  const operatingCategories = APQC_PCF_LEVEL1.filter((c) => c.type === 'operating');
  const supportCategories = APQC_PCF_LEVEL1.filter((c) => c.type === 'management_support');

  function getCapsForCategory(pcfId: string): CapabilityMapEntry[] {
    const catNumber = pcfId.replace('.0', '');
    return capabilities.filter((c) => c.pcfId.split('.')[0] === catNumber);
  }

  const criticalityOrder: Record<string, number> = {
    critical: 4, high: 3, medium: 2, low: 1,
  };

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Capability Map</h1>
          <p className="text-sm text-slate-500 mt-1">
            APQC PCF-aligned capability maturity heatmap
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse"
            >
              <div className="h-5 bg-slate-200 rounded w-64 mb-4" />
              <div className="h-4 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (capabilities.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Capability Map</h1>
          <p className="text-sm text-slate-500 mt-1">
            APQC PCF-aligned capability maturity heatmap
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Map className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            Capability Heatmap
          </h3>
          <p className="text-sm text-slate-500">
            No capabilities mapped yet. Import gaps or create capabilities to populate this view.
          </p>
        </div>
      </div>
    );
  }

  function renderSection(title: string, categories: typeof APQC_PCF_LEVEL1) {
    return (
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          {title}
        </h2>
        <div className="space-y-3">
          {categories.map((cat) => {
            const caps = getCapsForCategory(cat.pcfId);
            return (
              <div
                key={cat.pcfId}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 bg-white px-2 py-0.5 rounded">
                      {cat.pcfId}
                    </span>
                    <span className="text-sm font-semibold text-slate-700">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {caps.length} capabilit{caps.length !== 1 ? 'ies' : 'y'}
                  </span>
                </div>
                {caps.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-slate-400 border-b border-slate-100">
                        <th className="text-left py-2 px-5 font-medium">PCF ID</th>
                        <th className="text-left py-2 px-5 font-medium">Capability</th>
                        <th className="text-center py-2 px-5 font-medium">Maturity</th>
                        <th className="text-center py-2 px-5 font-medium">Score</th>
                        <th className="text-center py-2 px-5 font-medium">Criticality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caps
                        .sort(
                          (a, b) =>
                            (criticalityOrder[b.businessCriticality || ''] || 0) -
                            (criticalityOrder[a.businessCriticality || ''] || 0)
                        )
                        .map((cap) => (
                          <tr
                            key={cap.id}
                            className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                          >
                            <td className="py-2.5 px-5 text-xs font-mono text-slate-400">
                              {cap.pcfId}
                            </td>
                            <td className="py-2.5 px-5 text-sm text-slate-700">
                              {cap.capabilityName}
                            </td>
                            <td className="py-2.5 px-5 text-center">
                              <MaturityIndicator maturity={cap.maturityCurrent} />
                            </td>
                            <td className="py-2.5 px-5 text-center text-sm text-slate-600">
                              {cap.maturityScore != null ? `${cap.maturityScore}/5` : '—'}
                            </td>
                            <td className="py-2.5 px-5 text-center">
                              {cap.businessCriticality ? (
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
                                    cap.businessCriticality === 'critical'
                                      ? 'bg-red-50 text-red-600'
                                      : cap.businessCriticality === 'high'
                                        ? 'bg-orange-50 text-orange-600'
                                        : cap.businessCriticality === 'medium'
                                          ? 'bg-yellow-50 text-yellow-700'
                                          : 'bg-slate-100 text-slate-500'
                                  }`}
                                >
                                  {cap.businessCriticality}
                                </span>
                              ) : (
                                <span className="text-xs text-slate-300">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="px-5 py-4 text-sm text-slate-400">
                    No capabilities mapped to this category
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Capability Map</h1>
        <p className="text-sm text-slate-500 mt-1">
          APQC PCF-aligned capability maturity heatmap
        </p>
      </div>

      {renderSection('Operating Processes', operatingCategories)}
      {renderSection('Management & Support Services', supportCategories)}
    </div>
  );
}
