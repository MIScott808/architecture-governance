'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { ParkingReason } from '@/lib/types/parking-lot';

const TYPE_OPTIONS = [
  { value: 'requirement', label: 'Requirement' },
  { value: 'initiative', label: 'Initiative' },
  { value: 'program', label: 'Program' },
  { value: 'capability_gap', label: 'Capability Gap' },
];

const REASON_OPTIONS: { value: ParkingReason; label: string }[] = [
  { value: 'budget_constraint', label: 'Budget Constraint' },
  { value: 'resource_unavailable', label: 'Resource Unavailable' },
  { value: 'dependency_blocked', label: 'Dependency Blocked' },
  { value: 'architecture_conflict', label: 'Architecture Conflict' },
  { value: 'strategic_reprioritization', label: 'Strategic Reprioritization' },
  { value: 'deferred', label: 'Deferred' },
];

export default function ParkFormModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    itemName: '',
    itemType: 'requirement',
    itemDescription: '',
    reasonParked: 'deferred' as ParkingReason,
    reviewDate: '',
    estimatedEffort: '',
    reactivationCriteria: '',
    affectedCapabilities: '',
    affectedDomains: [] as string[],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.itemName.trim()) {
      setError('Item name is required');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/parking-lot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          affectedCapabilities: form.affectedCapabilities
            ? form.affectedCapabilities.split(',').map(s => s.trim()).filter(Boolean)
            : [],
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  function toggleDomain(domain: string) {
    setForm(prev => ({
      ...prev,
      affectedDomains: prev.affectedDomains.includes(domain)
        ? prev.affectedDomains.filter(d => d !== domain)
        : [...prev.affectedDomains, domain],
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Park Item</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.itemName}
              onChange={(e) => setForm({ ...form, itemName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              placeholder="e.g., CRM Integration Initiative"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                value={form.itemType}
                onChange={(e) => setForm({ ...form, itemType: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              >
                {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
              <select
                value={form.reasonParked}
                onChange={(e) => setForm({ ...form, reasonParked: e.target.value as ParkingReason })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              >
                {REASON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              value={form.itemDescription}
              onChange={(e) => setForm({ ...form, itemDescription: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Review Date</label>
              <input
                type="date"
                value={form.reviewDate}
                onChange={(e) => setForm({ ...form, reviewDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Effort</label>
              <input
                type="text"
                value={form.estimatedEffort}
                onChange={(e) => setForm({ ...form, estimatedEffort: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
                placeholder="e.g., 3 sprints"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Affected Domains</label>
            <div className="flex gap-2">
              {['business', 'information', 'technology'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toggleDomain(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    form.affectedDomains.includes(d)
                      ? 'bg-mana-blue-wash border-mana-blue text-mana-blue'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Affected Capabilities (PCF IDs, comma-separated)
            </label>
            <input
              type="text"
              value={form.affectedCapabilities}
              onChange={(e) => setForm({ ...form, affectedCapabilities: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              placeholder="e.g., 1.0, 2.1, 3.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reactivation Criteria</label>
            <textarea
              value={form.reactivationCriteria}
              onChange={(e) => setForm({ ...form, reactivationCriteria: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none resize-none"
              placeholder="What conditions must be met to reactivate this item?"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Park Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
