'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import type { ArchitecturePrinciple } from '@/lib/types/artifacts';

interface ComplianceRecord {
  id: string;
  principleId: string;
  complianceStatus: string;
  exceptionReason?: string;
}

const STATUS_OPTIONS = [
  { value: '', label: 'Not Assessed' },
  { value: 'compliant', label: 'Compliant' },
  { value: 'non_compliant', label: 'Non-Compliant' },
  { value: 'exception_granted', label: 'Exception' },
  { value: 'not_applicable', label: 'N/A' },
];

const STATUS_COLORS: Record<string, string> = {
  compliant: 'border-emerald-300 bg-emerald-50',
  non_compliant: 'border-red-300 bg-red-50',
  exception_granted: 'border-amber-300 bg-amber-50',
  not_applicable: 'border-slate-200 bg-slate-50',
};

export default function ComplianceAssessor({
  artifactId,
  onUpdated,
}: {
  artifactId: string;
  onUpdated?: () => void;
}) {
  const [principles, setPrinciples] = useState<ArchitecturePrinciple[]>([]);
  const [compliance, setCompliance] = useState<ComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('/api/principles'),
          fetch(`/api/artifacts/${artifactId}/compliance`),
        ]);
        const pData = await pRes.json();
        const cData = await cRes.json();
        setPrinciples(pData.principles || []);
        setCompliance(
          (cData.compliance || []).map((c: Record<string, unknown>) => ({
            id: c.id as string,
            principleId: c.principle_id as string,
            complianceStatus: c.compliance_status as string,
            exceptionReason: c.exception_reason as string | undefined,
          }))
        );
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [artifactId]);

  async function handleStatusChange(principleId: string, status: string) {
    if (!status) return;
    setSavingId(principleId);
    try {
      const res = await fetch(`/api/artifacts/${artifactId}/compliance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ principleId, complianceStatus: status }),
      });
      if (res.ok) {
        const data = await res.json();
        const record = data.compliance;
        setCompliance(prev => {
          const filtered = prev.filter(c => c.principleId !== principleId);
          return [...filtered, {
            id: record.id,
            principleId: record.principle_id,
            complianceStatus: record.compliance_status,
            exceptionReason: record.exception_reason,
          }];
        });
        onUpdated?.();
      }
    } finally {
      setSavingId(null);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Principle Compliance</h2>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-mana-blue" />
        </div>
      </div>
    );
  }

  if (principles.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Principle Compliance</h2>
        <p className="text-sm text-slate-500">
          No principles defined yet. Create principles to assess compliance.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Principle Compliance</h2>
      <div className="space-y-3">
        {principles.map(p => {
          const record = compliance.find(c => c.principleId === p.id);
          const currentStatus = record?.complianceStatus || '';
          return (
            <div
              key={p.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                currentStatus ? STATUS_COLORS[currentStatus] || 'border-slate-200' : 'border-slate-200'
              }`}
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="text-sm font-medium text-slate-700 truncate">{p.principleName}</p>
                <p className="text-xs text-slate-400 capitalize">{p.domain.replace('_', ' ')}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {savingId === p.id && <Loader2 className="w-3.5 h-3.5 animate-spin text-mana-blue" />}
                <select
                  value={currentStatus}
                  onChange={(e) => handleStatusChange(p.id, e.target.value)}
                  disabled={savingId === p.id}
                  className="px-2 py-1 border border-slate-200 rounded text-xs text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none disabled:opacity-50"
                >
                  {STATUS_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
