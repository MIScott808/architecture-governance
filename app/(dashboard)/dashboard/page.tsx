'use client';

import { useState, useEffect } from 'react';
import {
  Shield, Layers, AlertTriangle, ParkingCircle, CheckSquare, RefreshCw,
  TrendingUp, TrendingDown,
} from 'lucide-react';
import { ADM_PHASE_LABELS } from '@/lib/types/adm';
import type { ADMPhase } from '@/lib/types/adm';
import type { CapabilityMapEntry } from '@/lib/types/capabilities';
import { dbCapabilityToCapability } from '@/lib/types/capabilities';
import CapabilityHeatmap from '@/components/dashboard/capability-heatmap';
import ConflictChart from '@/components/dashboard/conflict-chart';
import ComplianceScorecard from '@/components/dashboard/compliance-scorecard';
import ADMPhaseTracker from '@/components/dashboard/adm-phase-tracker';
import ExportPdfButton from '@/components/dashboard/export-pdf-button';

interface DashboardStats {
  artifactCount: number;
  openConflictCount: number;
  parkedItemCount: number;
  compliancePercent: number | null;
  activePrincipleCount: number;
  currentAdmPhase: ADMPhase | null;
}

interface ComplianceReport {
  principleId: string;
  principleName: string;
  complianceRate: number | null;
}

interface Conflict {
  conflictType: string;
  severity: string;
}

interface AlignmentRanking {
  artifactId: string;
  artifactName: string;
  score: number;
  complianceRate: number;
  capCoverage: 'mapped' | 'unmapped';
  conflictCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [capabilities, setCapabilities] = useState<CapabilityMapEntry[]>([]);
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [complianceReport, setComplianceReport] = useState<ComplianceReport[]>([]);
  const [alignmentRankings, setAlignmentRankings] = useState<AlignmentRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, capsRes, conflictsRes, compRes, alignRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/capabilities'),
          fetch('/api/conflicts?status=open'),
          fetch('/api/compliance/report'),
          fetch('/api/dashboard/alignment'),
        ]);

        const [statsData, capsData, conflictsData, compData, alignData] = await Promise.all([
          statsRes.json(),
          capsRes.json(),
          conflictsRes.json(),
          compRes.json(),
          alignRes.json(),
        ]);

        setStats(statsData);
        setCapabilities(
          (capsData.capabilities || []).map((c: Record<string, unknown>) =>
            dbCapabilityToCapability(c)
          )
        );
        setConflicts(
          (conflictsData.conflicts || []).map((c: { conflict_type?: string; conflictType?: string; severity: string }) => ({
            conflictType: c.conflict_type || c.conflictType || '',
            severity: c.severity,
          }))
        );
        setComplianceReport(compData.report || []);
        setAlignmentRankings(alignData.rankings || []);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const cards = [
    {
      label: 'Artifacts',
      value: stats?.artifactCount ?? '—',
      icon: Layers,
      color: 'from-mana-blue to-mana-blue-bright',
    },
    {
      label: 'Open Conflicts',
      value: stats?.openConflictCount ?? '—',
      icon: AlertTriangle,
      color: 'from-mana-coral to-mana-red-bright',
    },
    {
      label: 'Parked Items',
      value: stats?.parkedItemCount ?? '—',
      icon: ParkingCircle,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Compliance',
      value: stats?.compliancePercent != null ? `${stats.compliancePercent}%` : '—',
      icon: CheckSquare,
      color: 'from-mana-teal to-mana-teal-light',
    },
    {
      label: 'Principles',
      value: stats?.activePrincipleCount ?? '—',
      icon: Shield,
      color: 'from-mana-gold to-mana-gold-light',
    },
    {
      label: 'ADM Phase',
      value: stats?.currentAdmPhase
        ? ADM_PHASE_LABELS[stats.currentAdmPhase]
        : '—',
      icon: RefreshCw,
      color: 'from-slate-500 to-slate-600',
      small: true,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Architecture Runway Health
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Cross-cutting governance overview across the Mana Platform
          </p>
        </div>
        <ExportPdfButton />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`bg-white rounded-xl border border-slate-200 p-4 ${
              loading ? 'animate-pulse' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-500">
                {card.label}
              </span>
            </div>
            <div
              className={`font-bold text-slate-900 ${
                card.small ? 'text-sm' : 'text-2xl'
              }`}
            >
              {loading ? (
                <div className="h-7 bg-slate-100 rounded w-12" />
              ) : (
                card.value
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Capability Maturity Heatmap
          </h2>
          {loading ? (
            <div className="h-64 animate-pulse bg-slate-50 rounded-lg" />
          ) : (
            <CapabilityHeatmap capabilities={capabilities} />
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Conflict Severity Distribution
          </h2>
          {loading ? (
            <div className="h-64 animate-pulse bg-slate-50 rounded-lg" />
          ) : (
            <ConflictChart conflicts={conflicts} />
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Principle Compliance Scorecard
          </h2>
          {loading ? (
            <div className="h-64 animate-pulse bg-slate-50 rounded-lg" />
          ) : (
            <ComplianceScorecard report={complianceReport} />
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            ADM Cycle Tracker
          </h2>
          {loading ? (
            <div className="h-64 animate-pulse bg-slate-50 rounded-lg" />
          ) : stats?.currentAdmPhase ? (
            <div className="py-4">
              <ADMPhaseTracker currentPhase={stats.currentAdmPhase} />
              <p className="text-sm text-slate-500 mt-4 text-center">
                Current: <strong>{ADM_PHASE_LABELS[stats.currentAdmPhase]}</strong>
              </p>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
              Start an ADM cycle to track progress
            </div>
          )}
        </div>
      </div>

      {/* Alignment Rankings */}
      {!loading && alignmentRankings.length > 0 && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-mana-teal" />
              <h2 className="text-lg font-semibold text-slate-900">
                Top Aligned
              </h2>
            </div>
            <div className="space-y-2">
              {alignmentRankings.slice(0, 5).map((item, i) => (
                <div
                  key={item.artifactId}
                  className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 w-5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-700 truncate max-w-[200px]">
                      {item.artifactName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mana-teal rounded-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 w-10 text-right">
                      {item.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="w-5 h-5 text-mana-coral" />
              <h2 className="text-lg font-semibold text-slate-900">
                At Risk
              </h2>
            </div>
            <div className="space-y-2">
              {[...alignmentRankings]
                .reverse()
                .slice(0, 5)
                .map((item, i) => (
                  <div
                    key={item.artifactId}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400 w-5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-slate-700 truncate max-w-[200px]">
                        {item.artifactName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-mana-coral rounded-full"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600 w-10 text-right">
                        {item.score}%
                      </span>
                      {item.conflictCount > 0 && (
                        <span className="text-[10px] text-red-500 font-medium">
                          {item.conflictCount} conflict{item.conflictCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
