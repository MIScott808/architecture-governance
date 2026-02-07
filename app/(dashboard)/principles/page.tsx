'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Plus, Loader2 } from 'lucide-react';
import type { ArchitecturePrinciple } from '@/lib/types/artifacts';
import PrincipleCard from '@/components/principles/principle-card';
import PrincipleFormModal from '@/components/principles/principle-form-modal';

const DOMAIN_ORDER = ['business', 'information', 'technology', 'cross_cutting'];
const DOMAIN_LABELS: Record<string, string> = {
  business: 'Business Architecture',
  information: 'Information Architecture',
  technology: 'Technology Architecture',
  cross_cutting: 'Cross-Cutting',
};

export default function PrinciplesPage() {
  const [principles, setPrinciples] = useState<ArchitecturePrinciple[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ArchitecturePrinciple | null>(null);

  const fetchPrinciples = useCallback(async () => {
    try {
      const res = await fetch('/api/principles');
      const data = await res.json();
      setPrinciples(data.principles || []);
    } catch {
      // silently fail - empty list shown
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPrinciples(); }, [fetchPrinciples]);

  function handleEdit(p: ArchitecturePrinciple) {
    setEditing(p);
    setShowModal(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this principle? This will also remove compliance records.')) return;
    await fetch(`/api/principles/${id}`, { method: 'DELETE' });
    fetchPrinciples();
  }

  function handleSaved() {
    setShowModal(false);
    setEditing(null);
    fetchPrinciples();
  }

  const grouped = DOMAIN_ORDER.reduce<Record<string, ArchitecturePrinciple[]>>((acc, domain) => {
    const items = principles.filter(p => p.domain === domain);
    if (items.length > 0) acc[domain] = items;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Architecture Principles</h1>
          <p className="text-sm text-slate-500 mt-1">
            Governance principles by architecture domain
            {principles.length > 0 && (
              <span className="ml-2 text-slate-400">({principles.length} total)</span>
            )}
          </p>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          New Principle
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
        </div>
      ) : principles.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Principles Defined</h3>
          <p className="text-sm text-slate-500 mb-4">Define architecture principles to assess artifact compliance</p>
          <button
            onClick={() => { setEditing(null); setShowModal(true); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Create First Principle
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([domain, items]) => (
            <div key={domain}>
              <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
                {DOMAIN_LABELS[domain] || domain}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(p => (
                  <PrincipleCard
                    key={p.id}
                    principle={p}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <PrincipleFormModal
          principle={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
