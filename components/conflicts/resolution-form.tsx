'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { ResolutionStatus } from '@/lib/types/conflicts';

const STATUS_OPTIONS: { value: ResolutionStatus; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'accepted_risk', label: 'Accepted Risk' },
  { value: 'deferred', label: 'Deferred' },
];

export default function ResolutionForm({
  conflictId,
  currentStatus,
  currentNotes,
  onUpdated,
}: {
  conflictId: string;
  currentStatus: ResolutionStatus;
  currentNotes?: string;
  onUpdated: () => void;
}) {
  const [status, setStatus] = useState<ResolutionStatus>(currentStatus);
  const [notes, setNotes] = useState(currentNotes || '');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await fetch(`/api/conflicts/${conflictId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resolutionStatus: status,
          resolutionNotes: notes,
        }),
      });
      onUpdated();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Resolution</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ResolutionStatus)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
          >
            {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none resize-none"
            placeholder="Describe the resolution approach..."
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all disabled:opacity-50"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          Save Resolution
        </button>
      </div>
    </div>
  );
}
