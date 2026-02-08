'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Plus, X, ChevronRight } from 'lucide-react';
import { ADM_PHASE_LABELS } from '@/lib/types/adm';
import type { ADMCycle } from '@/lib/types/adm';
import ADMPhaseTracker from '@/components/dashboard/adm-phase-tracker';
import Link from 'next/link';

export default function ADMCyclesPage() {
  const [cycles, setCycles] = useState<ADMCycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchCycles = useCallback(async () => {
    try {
      const res = await fetch('/api/adm-cycles');
      const data = await res.json();
      setCycles(data.cycles || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCycles(); }, [fetchCycles]);

  async function handleCreate() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/adm-cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cycleName: newName.trim() }),
      });
      if (res.ok) {
        setShowModal(false);
        setNewName('');
        fetchCycles();
      }
    } catch {
      // silent
    } finally {
      setCreating(false);
    }
  }

  const statusBadge = (status: ADMCycle['status']) => {
    const styles: Record<string, string> = {
      in_progress: 'bg-mana-blue/10 text-mana-blue',
      completed: 'bg-mana-teal/10 text-mana-teal',
      abandoned: 'bg-slate-100 text-slate-500',
    };
    const labels: Record<string, string> = {
      in_progress: 'In Progress',
      completed: 'Completed',
      abandoned: 'Abandoned',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ADM Cycles</h1>
          <p className="text-sm text-slate-500 mt-1">
            TOGAF Architecture Development Method cycle tracking
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Start New Cycle
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
              <div className="h-5 bg-slate-200 rounded w-48 mb-3" />
              <div className="h-4 bg-slate-100 rounded w-full" />
            </div>
          ))}
        </div>
      ) : cycles.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No ADM Cycles</h3>
          <p className="text-sm text-slate-500">
            Start an ADM cycle to track architecture evolution
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {cycles.map((cycle) => (
            <Link
              key={cycle.id}
              href={`/adm-cycles/${cycle.id}`}
              className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-mana-blue-light hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">
                    #{cycle.cycleNumber}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {cycle.cycleName}
                  </h3>
                  {statusBadge(cycle.status)}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{ADM_PHASE_LABELS[cycle.currentPhase]}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
              <ADMPhaseTracker currentPhase={cycle.currentPhase} compact />
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <span>Started {new Date(cycle.startedAt).toLocaleDateString()}</span>
                {cycle.completedAt && (
                  <span>
                    Completed {new Date(cycle.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* New Cycle Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">
                Start New ADM Cycle
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Cycle Name
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g., FY26 Digital Transformation"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mana-blue focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newName.trim() || creating}
                className="px-4 py-2 text-sm text-white bg-gradient-to-r from-mana-blue to-mana-blue-bright rounded-lg font-medium disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Start Cycle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
