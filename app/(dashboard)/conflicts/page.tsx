'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Loader2, Scan } from 'lucide-react';
import type { ArchitectureConflict, Severity, ConflictType, ResolutionStatus } from '@/lib/types/conflicts';
import ConflictCard from '@/components/conflicts/conflict-card';

const SEVERITY_OPTIONS: { value: Severity | ''; label: string }[] = [
  { value: '', label: 'All Severities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const TYPE_OPTIONS: { value: ConflictType | ''; label: string }[] = [
  { value: '', label: 'All Types' },
  { value: 'capability_overlap', label: 'Capability Overlap' },
  { value: 'principle_violation', label: 'Principle Violation' },
  { value: 'resource_contention', label: 'Resource Contention' },
  { value: 'data_ownership', label: 'Data Ownership' },
  { value: 'integration_conflict', label: 'Integration' },
  { value: 'timeline_conflict', label: 'Timeline' },
  { value: 'technology_divergence', label: 'Tech Divergence' },
  { value: 'scope_overlap', label: 'Scope Overlap' },
];

const STATUS_OPTIONS: { value: ResolutionStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'accepted_risk', label: 'Accepted Risk' },
  { value: 'deferred', label: 'Deferred' },
];

export default function ConflictsPage() {
  const [conflicts, setConflicts] = useState<ArchitectureConflict[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [severityFilter, setSeverityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  const fetchConflicts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (severityFilter) params.set('severity', severityFilter);
      if (typeFilter) params.set('type', typeFilter);
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/conflicts?${params}`);
      const data = await res.json();
      setConflicts(data.conflicts || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [severityFilter, typeFilter, statusFilter]);

  useEffect(() => { fetchConflicts(); }, [fetchConflicts]);

  async function handleScan() {
    setScanning(true);
    setScanResult(null);
    try {
      const res = await fetch('/api/conflicts/scan', { method: 'POST' });
      const data = await res.json();
      if (data.summary) {
        const s = data.summary;
        setScanResult(
          `Scan complete: ${s.capabilityOverlaps} overlaps, ${s.crossDomainFlags} cross-domain flags, ${s.parkingLotConflicts} parking lot conflicts. ${s.newConflictsCreated} new conflicts created.`
        );
      }
      fetchConflicts();
    } catch {
      setScanResult('Scan failed. Database functions may not be deployed yet.');
    } finally {
      setScanning(false);
    }
  }

  // Summary stats
  const openCount = conflicts.filter(c => c.resolutionStatus === 'open').length;
  const criticalCount = conflicts.filter(c => c.severity === 'critical' && c.resolutionStatus === 'open').length;
  const highCount = conflicts.filter(c => c.severity === 'high' && c.resolutionStatus === 'open').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Architecture Conflicts</h1>
          <p className="text-sm text-slate-500 mt-1">Detected conflicts across artifacts, capabilities, and principles</p>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all disabled:opacity-50"
        >
          {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Scan className="w-4 h-4" />}
          Scan for Conflicts
        </button>
      </div>

      {/* Scan result banner */}
      {scanResult && (
        <div className="mb-4 p-3 bg-mana-blue-wash border border-mana-blue-pale rounded-lg text-sm text-mana-blue">
          {scanResult}
        </div>
      )}

      {/* Summary stats */}
      {conflicts.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Open Conflicts</p>
            <p className="text-2xl font-bold text-slate-900">{openCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-red-200 p-4">
            <p className="text-xs text-red-500">Critical</p>
            <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-orange-200 p-4">
            <p className="text-xs text-orange-500">High</p>
            <p className="text-2xl font-bold text-orange-600">{highCount}</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={severityFilter}
          onChange={(e) => { setSeverityFilter(e.target.value); setLoading(true); }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {SEVERITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setLoading(true); }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setLoading(true); }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
        </div>
      ) : conflicts.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Conflicts Detected</h3>
          <p className="text-sm text-slate-500 mb-4">Click &ldquo;Scan for Conflicts&rdquo; to analyze your artifacts</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conflicts.map(conflict => (
            <ConflictCard key={conflict.id} conflict={conflict} />
          ))}
        </div>
      )}
    </div>
  );
}
