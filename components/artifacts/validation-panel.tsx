'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { ArchitectureArtifact, ArchitectureDomain } from '@/lib/types/artifacts';

const DOMAIN_OPTIONS: { value: ArchitectureDomain; label: string }[] = [
  { value: 'business', label: 'Business' },
  { value: 'information', label: 'Information' },
  { value: 'technology', label: 'Technology' },
];

const SUB_DOMAIN_OPTIONS: Record<string, string[]> = {
  business: ['capability', 'strategy', 'process'],
  information: ['data_entity', 'data_flow', 'information_service'],
  technology: ['application', 'infrastructure', 'platform'],
};

export default function ValidationPanel({
  artifact,
  onValidated,
}: {
  artifact: ArchitectureArtifact;
  onValidated: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [correcting, setCorrecting] = useState(false);
  const [correctedDomain, setCorrectedDomain] = useState<ArchitectureDomain>('business');
  const [correctedSubDomain, setCorrectedSubDomain] = useState('');

  const confidence = artifact.autoTagConfidence ?? 0;
  const confidencePct = Math.round(confidence * 100);
  const currentTag = artifact.tags?.[0];

  async function handleConfirm() {
    setSaving(true);
    try {
      await fetch(`/api/artifacts/${artifact.id}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true }),
      });
      onValidated();
    } finally {
      setSaving(false);
    }
  }

  async function handleCorrect() {
    setSaving(true);
    try {
      await fetch(`/api/artifacts/${artifact.id}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmed: false,
          correctedDomain,
          correctedSubDomain: correctedSubDomain || undefined,
        }),
      });
      onValidated();
    } finally {
      setSaving(false);
    }
  }

  if (artifact.humanValidated) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation</h2>
        <div className="flex items-center gap-2 text-sm text-emerald-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>Human validated</span>
        </div>
        {artifact.validatedAt && (
          <p className="text-xs text-slate-400 mt-1">
            {new Date(artifact.validatedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation</h2>

      {/* Confidence meter */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Auto-tag Confidence</span>
          <span className={confidence < 0.7 ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
            {confidencePct}%
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              confidence < 0.5 ? 'bg-red-400' : confidence < 0.7 ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      {/* Current auto-tag display */}
      {currentTag && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500 mb-1">Current Classification</p>
          <p className="text-sm font-medium text-slate-700 capitalize">
            {currentTag.domain}{currentTag.subDomain ? ` / ${currentTag.subDomain}` : ''}
          </p>
          {currentTag.reasoning && (
            <p className="text-xs text-slate-400 mt-1">{currentTag.reasoning}</p>
          )}
        </div>
      )}

      {confidence < 0.7 && (
        <div className="flex items-start gap-2 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700">
            Low confidence auto-classification. Please confirm or correct.
          </p>
        </div>
      )}

      {!correcting ? (
        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Confirm
          </button>
          <button
            onClick={() => {
              setCorrecting(true);
              if (currentTag) {
                setCorrectedDomain(currentTag.domain);
                setCorrectedSubDomain(currentTag.subDomain || '');
              }
            }}
            className="flex-1 px-3 py-2 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
          >
            Correct
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Domain</label>
            <select
              value={correctedDomain}
              onChange={(e) => {
                setCorrectedDomain(e.target.value as ArchitectureDomain);
                setCorrectedSubDomain('');
              }}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
            >
              {DOMAIN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Sub-Domain</label>
            <select
              value={correctedSubDomain}
              onChange={(e) => setCorrectedSubDomain(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
            >
              <option value="">Select...</option>
              {(SUB_DOMAIN_OPTIONS[correctedDomain] || []).map(sd => (
                <option key={sd} value={sd}>{sd.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCorrect}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Correction
            </button>
            <button
              onClick={() => setCorrecting(false)}
              className="px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
