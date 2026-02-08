'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ChevronRight, Clock, CalendarCheck, GitCompare, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ADM_PHASE_LABELS, ADM_PHASE_ORDER } from '@/lib/types/adm';
import type { ADMCycle } from '@/lib/types/adm';
import ADMPhaseTracker from '@/components/dashboard/adm-phase-tracker';
import Link from 'next/link';

export default function ADMCycleDetailPage() {
  const params = useParams();
  const [cycle, setCycle] = useState<ADMCycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [advancing, setAdvancing] = useState(false);
  const [comparison, setComparison] = useState<{
    baseline: { capturedAt: string } | null;
    target: { capturedAt: string } | null;
    deltas: Array<{
      pcfId: string;
      capabilityName: string;
      baselineScore: number | null;
      targetScore: number | null;
      delta: number;
    }>;
  } | null>(null);
  const [compDomain, setCompDomain] = useState('business');

  const fetchCycle = useCallback(async () => {
    try {
      const res = await fetch(`/api/adm-cycles/${params.id}`);
      const data = await res.json();
      setCycle(data.cycle || null);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => { fetchCycle(); }, [fetchCycle]);

  const fetchComparison = useCallback(async () => {
    try {
      const res = await fetch(`/api/adm-cycles/${params.id}/compare?domain=${compDomain}`);
      const data = await res.json();
      setComparison(data.comparison || null);
    } catch {
      // silent
    }
  }, [params.id, compDomain]);

  useEffect(() => { fetchComparison(); }, [fetchComparison]);

  async function handleAdvance() {
    if (!cycle || cycle.status !== 'in_progress') return;
    setAdvancing(true);
    try {
      const res = await fetch(`/api/adm-cycles/${cycle.id}/phase`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (res.ok) {
        setCycle(data.cycle);
      }
    } catch {
      // silent
    } finally {
      setAdvancing(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-64 mb-4" />
        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <div className="h-10 bg-slate-100 rounded w-full mb-6" />
          <div className="h-4 bg-slate-100 rounded w-48" />
        </div>
      </div>
    );
  }

  if (!cycle) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Cycle not found</p>
        <Link href="/adm-cycles" className="text-mana-blue text-sm mt-2 inline-block">
          Back to cycles
        </Link>
      </div>
    );
  }

  const currentIndex = ADM_PHASE_ORDER.indexOf(cycle.currentPhase);
  const isLastPhase = currentIndex >= ADM_PHASE_ORDER.length - 1;
  const nextPhase = !isLastPhase ? ADM_PHASE_ORDER[currentIndex + 1] : null;

  return (
    <div>
      <Link
        href="/adm-cycles"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-mana-blue mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to ADM Cycles
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              #{cycle.cycleNumber}
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              {cycle.cycleName}
            </h1>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                cycle.status === 'in_progress'
                  ? 'bg-mana-blue/10 text-mana-blue'
                  : cycle.status === 'completed'
                    ? 'bg-mana-teal/10 text-mana-teal'
                    : 'bg-slate-100 text-slate-500'
              }`}
            >
              {cycle.status === 'in_progress' ? 'In Progress' : cycle.status === 'completed' ? 'Completed' : 'Abandoned'}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Current Phase: <strong>{ADM_PHASE_LABELS[cycle.currentPhase]}</strong>
          </p>
        </div>
        {cycle.status === 'in_progress' && (
          <button
            onClick={handleAdvance}
            disabled={advancing}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all disabled:opacity-50"
          >
            {advancing ? (
              'Advancing...'
            ) : isLastPhase ? (
              'Complete Cycle'
            ) : (
              <>
                Advance to {ADM_PHASE_LABELS[nextPhase!]}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      {/* Phase Tracker */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Phase Progress</h2>
        <ADMPhaseTracker currentPhase={cycle.currentPhase} />
      </div>

      {/* Phase History */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Phase History</h2>
        {cycle.phaseHistory.length === 0 ? (
          <p className="text-sm text-slate-400">No phase transitions recorded yet</p>
        ) : (
          <div className="space-y-3">
            {cycle.phaseHistory.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      entry.exitedAt ? 'bg-mana-teal' : 'bg-mana-blue animate-pulse'
                    }`}
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {ADM_PHASE_LABELS[entry.phase]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Entered {new Date(entry.enteredAt).toLocaleDateString()}
                  </span>
                  {entry.exitedAt && (
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="w-3 h-3" />
                      Exited {new Date(entry.exitedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Architecture Evolution Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-mana-blue" />
            <h2 className="text-sm font-semibold text-slate-700">Architecture Evolution</h2>
          </div>
          <select
            value={compDomain}
            onChange={(e) => setCompDomain(e.target.value)}
            className="px-2 py-1 border border-slate-200 rounded text-xs text-slate-600"
          >
            <option value="business">Business</option>
            <option value="information">Information</option>
            <option value="technology">Technology</option>
          </select>
        </div>

        {!comparison || comparison.deltas.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">
            Advance through phases to capture architecture state snapshots for comparison
          </p>
        ) : (
          <div>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              {comparison.baseline && (
                <span>Baseline: {new Date(comparison.baseline.capturedAt).toLocaleDateString()}</span>
              )}
              {comparison.target && (
                <span>Latest: {new Date(comparison.target.capturedAt).toLocaleDateString()}</span>
              )}
            </div>
            <div className="space-y-2">
              {comparison.deltas.map((d) => (
                <div
                  key={d.pcfId}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    {d.delta > 0 ? (
                      <TrendingUp className="w-4 h-4 text-mana-teal" />
                    ) : d.delta < 0 ? (
                      <TrendingDown className="w-4 h-4 text-mana-coral" />
                    ) : (
                      <Minus className="w-4 h-4 text-slate-300" />
                    )}
                    <span className="text-xs font-mono text-slate-400">{d.pcfId}</span>
                    <span className="text-sm text-slate-700">{d.capabilityName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">
                      {d.baselineScore ?? '—'} → {d.targetScore ?? '—'}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        d.delta > 0
                          ? 'bg-emerald-50 text-emerald-600'
                          : d.delta < 0
                            ? 'bg-red-50 text-red-600'
                            : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {d.delta > 0 ? '+' : ''}{d.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
