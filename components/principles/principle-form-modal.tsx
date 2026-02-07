'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { ArchitecturePrinciple, ArchitectureDomain } from '@/lib/types/artifacts';

const DOMAIN_OPTIONS: { value: ArchitectureDomain | 'cross_cutting'; label: string }[] = [
  { value: 'business', label: 'Business' },
  { value: 'information', label: 'Information' },
  { value: 'technology', label: 'Technology' },
  { value: 'cross_cutting', label: 'Cross-Cutting' },
];

const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'deprecated', label: 'Deprecated' },
];

export default function PrincipleFormModal({
  principle,
  onClose,
  onSaved,
}: {
  principle?: ArchitecturePrinciple | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!principle;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    principleName: '',
    domain: 'business' as ArchitectureDomain | 'cross_cutting',
    rationale: '',
    implications: '',
    priority: 0,
    status: 'draft' as string,
  });

  useEffect(() => {
    if (principle) {
      setForm({
        principleName: principle.principleName,
        domain: principle.domain,
        rationale: principle.rationale || '',
        implications: principle.implications || '',
        priority: principle.priority,
        status: principle.status,
      });
    }
  }, [principle]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.principleName.trim()) {
      setError('Principle name is required');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const url = isEdit ? `/api/principles/${principle!.id}` : '/api/principles';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEdit ? 'Edit Principle' : 'New Principle'}
          </h2>
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
              Principle Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.principleName}
              onChange={(e) => setForm({ ...form, principleName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              placeholder="e.g., Data at Source"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Domain</label>
              <select
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value as ArchitectureDomain | 'cross_cutting' })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              >
                {DOMAIN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
              >
                {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <input
              type="number"
              min={0}
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rationale</label>
            <textarea
              value={form.rationale}
              onChange={(e) => setForm({ ...form, rationale: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none resize-none"
              placeholder="Why is this principle important?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Implications</label>
            <textarea
              value={form.implications}
              onChange={(e) => setForm({ ...form, implications: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none resize-none"
              placeholder="What does following this principle mean in practice?"
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
              {isEdit ? 'Update' : 'Create'} Principle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
