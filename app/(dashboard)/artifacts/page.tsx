'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Plus, Layers, Loader2, AlertCircle } from 'lucide-react';
import type { ArchitectureArtifact, SourceModule, LifecycleStatus } from '@/lib/types/artifacts';
import ArtifactCard from '@/components/artifacts/artifact-card';

const SOURCE_OPTIONS: { value: SourceModule | ''; label: string }[] = [
  { value: '', label: 'All Modules' },
  { value: 'strategic_compass', label: 'Strategic Compass' },
  { value: 'initiative_planner', label: 'Initiative Planner' },
  { value: 'voice_of_customer', label: 'Voice of Customer' },
  { value: 'requirements_manager', label: 'Requirements Manager' },
  { value: 'project_mgmt', label: 'Project Management' },
];

const STATUS_OPTIONS: { value: LifecycleStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'archived', label: 'Archived' },
  { value: 'superseded', label: 'Superseded' },
  { value: 'parking_lot', label: 'Parking Lot' },
];

const DOMAIN_OPTIONS = [
  { value: '', label: 'All Domains' },
  { value: 'business', label: 'Business' },
  { value: 'information', label: 'Information' },
  { value: 'technology', label: 'Technology' },
];

type TabFilter = 'all' | 'needs_review';

export default function ArtifactsPage() {
  const [artifacts, setArtifacts] = useState<ArchitectureArtifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [tab, setTab] = useState<TabFilter>('all');
  const [validationCount, setValidationCount] = useState(0);

  const fetchArtifacts = useCallback(async () => {
    try {
      const res = await fetch('/api/artifacts');
      const data = await res.json();
      setArtifacts(data.artifacts || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchValidationCount = useCallback(async () => {
    try {
      const res = await fetch('/api/artifacts/validation-queue');
      const data = await res.json();
      setValidationCount(data.count || 0);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchArtifacts();
    fetchValidationCount();
  }, [fetchArtifacts, fetchValidationCount]);

  const filtered = artifacts.filter(a => {
    if (search && !a.artifactName.toLowerCase().includes(search.toLowerCase())) return false;
    if (moduleFilter && a.sourceModule !== moduleFilter) return false;
    if (statusFilter && a.lifecycleStatus !== statusFilter) return false;
    if (domainFilter && !a.tags?.some(t => t.domain === domainFilter)) return false;
    if (tab === 'needs_review') {
      return !a.humanValidated && (a.autoTagConfidence == null || a.autoTagConfidence < 0.7);
    }
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Architecture Artifacts</h1>
          <p className="text-sm text-slate-500 mt-1">Central registry of all governed entities across the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
          <Plus className="w-4 h-4" />
          Register Artifact
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-200">
        <button
          onClick={() => setTab('all')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === 'all'
              ? 'border-mana-blue text-mana-blue'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          All Artifacts
          <span className="ml-1.5 text-xs text-slate-400">({artifacts.length})</span>
        </button>
        <button
          onClick={() => setTab('needs_review')}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            tab === 'needs_review'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          Needs Review
          {validationCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
              {validationCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search artifacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
          />
        </div>
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {DOMAIN_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">
            {tab === 'needs_review' ? 'No Artifacts Need Review' : 'No Artifacts Yet'}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {tab === 'needs_review'
              ? 'All artifacts have been validated.'
              : 'Register artifacts from across the Mana Platform to begin governance tracking.'}
          </p>
          {tab === 'all' && (
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" />
              Register First Artifact
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(artifact => (
            <ArtifactCard key={artifact.id} artifact={artifact} />
          ))}
        </div>
      )}
    </div>
  );
}
