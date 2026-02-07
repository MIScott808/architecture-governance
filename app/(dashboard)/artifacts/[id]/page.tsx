'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Edit, Loader2 } from 'lucide-react';
import Link from 'next/link';
import type { ArchitectureArtifact } from '@/lib/types/artifacts';
import DomainBadge from '@/components/shared/domain-badge';
import ValidationPanel from '@/components/artifacts/validation-panel';
import ComplianceAssessor from '@/components/artifacts/compliance-assessor';

const SOURCE_LABELS: Record<string, string> = {
  strategic_compass: 'Strategic Compass',
  initiative_planner: 'Initiative Planner',
  voice_of_customer: 'Voice of Customer',
  requirements_manager: 'Requirements Manager',
  project_mgmt: 'Project Management',
};

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  archived: 'bg-slate-100 text-slate-600',
  superseded: 'bg-amber-100 text-amber-800',
  parking_lot: 'bg-purple-100 text-purple-800',
};

export default function ArtifactDetailPage() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<ArchitectureArtifact | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArtifact = useCallback(async () => {
    try {
      const res = await fetch(`/api/artifacts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setArtifact(data.artifact || null);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchArtifact(); }, [fetchArtifact]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
      </div>
    );
  }

  if (!artifact) {
    return (
      <div>
        <Link href="/artifacts" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Artifacts
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Artifact not found or not yet connected to database.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/artifacts" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{artifact.artifactName}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[artifact.lifecycleStatus] || ''}`}>
              {artifact.lifecycleStatus.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{artifact.id}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium">
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-slate-500 mb-1">Source Module</dt>
                <dd className="text-sm font-medium text-slate-700">
                  {SOURCE_LABELS[artifact.sourceModule] || artifact.sourceModule}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 mb-1">Entity Type</dt>
                <dd className="text-sm font-medium text-slate-700 capitalize">{artifact.sourceEntityType}</dd>
              </div>
              {artifact.pcfCategoryName && (
                <div>
                  <dt className="text-xs text-slate-500 mb-1">PCF Category</dt>
                  <dd className="text-sm font-medium text-slate-700">{artifact.pcfCategoryName}</dd>
                </div>
              )}
              {artifact.pcfCategoryId && (
                <div>
                  <dt className="text-xs text-slate-500 mb-1">PCF ID</dt>
                  <dd className="text-sm font-mono text-slate-600">{artifact.pcfCategoryId}</dd>
                </div>
              )}
              <div className="col-span-2">
                <dt className="text-xs text-slate-500 mb-1">Created</dt>
                <dd className="text-sm text-slate-600">{new Date(artifact.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
            {artifact.artifactDescription && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <dt className="text-xs text-slate-500 mb-1">Description</dt>
                <dd className="text-sm text-slate-700">{artifact.artifactDescription}</dd>
              </div>
            )}
          </div>

          {/* Compliance Assessment */}
          <ComplianceAssessor artifactId={artifact.id} onUpdated={fetchArtifact} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Domain Tags */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Domain Tags</h2>
              <button className="text-xs text-mana-blue hover:text-mana-blue-bright font-medium">
                + Add Tag
              </button>
            </div>
            {artifact.tags && artifact.tags.length > 0 ? (
              <div className="space-y-2">
                {artifact.tags.map(tag => (
                  <div key={tag.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <DomainBadge domain={tag.domain} />
                      {tag.subDomain && (
                        <span className="text-xs text-slate-500 capitalize">{tag.subDomain.replace('_', ' ')}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 capitalize">{tag.tagSource}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No tags assigned</p>
            )}
          </div>

          {/* Validation Panel */}
          <ValidationPanel artifact={artifact} onValidated={fetchArtifact} />
        </div>
      </div>
    </div>
  );
}
