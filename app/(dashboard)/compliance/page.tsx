'use client';

import { useState, useEffect } from 'react';
import { CheckSquare, Loader2 } from 'lucide-react';
import DomainBadge from '@/components/shared/domain-badge';

interface ComplianceReport {
  principleId: string;
  principleName: string;
  domain: string;
  priority: number;
  total: number;
  compliant: number;
  nonCompliant: number;
  exceptions: number;
  notApplicable: number;
  complianceRate: number | null;
}

const DOMAIN_ORDER = ['business', 'information', 'technology', 'cross_cutting'];
const DOMAIN_LABELS: Record<string, string> = {
  business: 'Business Architecture',
  information: 'Information Architecture',
  technology: 'Technology Architecture',
  cross_cutting: 'Cross-Cutting',
};

export default function CompliancePage() {
  const [report, setReport] = useState<ComplianceReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch('/api/compliance/report');
        const data = await res.json();
        setReport(data.report || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  const grouped = DOMAIN_ORDER.reduce<Record<string, ComplianceReport[]>>((acc, domain) => {
    const items = report.filter(r => r.domain === domain);
    if (items.length > 0) acc[domain] = items;
    return acc;
  }, {});

  const overallAssessed = report.reduce((sum, r) => sum + r.total - r.notApplicable, 0);
  const overallCompliant = report.reduce((sum, r) => sum + r.compliant, 0);
  const overallRate = overallAssessed > 0 ? Math.round((overallCompliant / overallAssessed) * 100) : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Compliance Scorecard</h1>
          <p className="text-sm text-slate-500 mt-1">Principle compliance across all artifacts</p>
        </div>
        {overallRate !== null && (
          <div className="text-right">
            <p className="text-xs text-slate-500">Overall Compliance</p>
            <p className={`text-3xl font-bold ${
              overallRate >= 80 ? 'text-emerald-600' : overallRate >= 60 ? 'text-amber-600' : 'text-red-600'
            }`}>
              {overallRate}%
            </p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
        </div>
      ) : report.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Compliance Report</h3>
          <p className="text-sm text-slate-500">Define principles and assess artifacts to generate the scorecard</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([domain, items]) => (
            <div key={domain}>
              <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
                {DOMAIN_LABELS[domain] || domain}
              </h2>
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">Principle</th>
                      <th className="text-center text-xs font-medium text-slate-500 px-3 py-3 w-20">Assessed</th>
                      <th className="text-center text-xs font-medium text-slate-500 px-3 py-3 w-20">Compliant</th>
                      <th className="text-center text-xs font-medium text-slate-500 px-3 py-3 w-20">Violations</th>
                      <th className="text-center text-xs font-medium text-slate-500 px-3 py-3 w-24">Exceptions</th>
                      <th className="text-right text-xs font-medium text-slate-500 px-4 py-3 w-28">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(r => (
                      <tr key={r.principleId} className="border-b border-slate-50 last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <DomainBadge domain={r.domain} />
                            <span className="text-sm text-slate-700">{r.principleName}</span>
                          </div>
                        </td>
                        <td className="text-center text-sm text-slate-600 px-3 py-3">{r.total}</td>
                        <td className="text-center text-sm text-emerald-600 font-medium px-3 py-3">{r.compliant}</td>
                        <td className="text-center text-sm text-red-600 font-medium px-3 py-3">{r.nonCompliant}</td>
                        <td className="text-center text-sm text-amber-600 px-3 py-3">{r.exceptions}</td>
                        <td className="text-right px-4 py-3">
                          {r.complianceRate !== null ? (
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    r.complianceRate >= 80 ? 'bg-emerald-400' :
                                    r.complianceRate >= 60 ? 'bg-amber-400' : 'bg-red-400'
                                  }`}
                                  style={{ width: `${r.complianceRate}%` }}
                                />
                              </div>
                              <span className={`text-sm font-medium ${
                                r.complianceRate >= 80 ? 'text-emerald-600' :
                                r.complianceRate >= 60 ? 'text-amber-600' : 'text-red-600'
                              }`}>
                                {r.complianceRate}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
