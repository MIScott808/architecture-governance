'use client';

import { useState } from 'react';
import { Search, Plus, Layers } from 'lucide-react';
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

export default function ArtifactsPage() {
  const [artifacts] = useState<ArchitectureArtifact[]>([]);
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [domainFilter, setDomainFilter] = useState('');

  const filtered = artifacts.filter(a => {
    if (search && !a.artifactName.toLowerCase().includes(search.toLowerCase())) return false;
    if (moduleFilter && a.sourceModule !== moduleFilter) return false;
    if (statusFilter && a.lifecycleStatus !== statusFilter) return false;
    if (domainFilter && !a.tags?.some(t => t.domain === domainFilter)) return false;
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
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Artifacts Yet</h3>
          <p className="text-sm text-slate-500 mb-4">
            Register artifacts from across the Mana Platform to begin governance tracking.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" />
            Register First Artifact
          </button>
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
