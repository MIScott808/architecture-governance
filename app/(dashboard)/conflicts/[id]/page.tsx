'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import SeverityBadge from '@/components/shared/severity-badge';
import DomainBadge from '@/components/shared/domain-badge';
import ResolutionForm from '@/components/conflicts/resolution-form';
import type { ArchitectureConflict } from '@/lib/types/conflicts';

const TYPE_LABELS: Record<string, string> = {
  capability_overlap: 'Capability Overlap',
  principle_violation: 'Principle Violation',
  resource_contention: 'Resource Contention',
  data_ownership: 'Data Ownership',
  integration_conflict: 'Integration Conflict',
  timeline_conflict: 'Timeline Conflict',
  technology_divergence: 'Technology Divergence',
  scope_overlap: 'Scope Overlap',
};

const STATUS_STYLES: Record<string, string> = {
  open: 'bg-red-100 text-red-800',
  under_review: 'bg-amber-100 text-amber-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  accepted_risk: 'bg-blue-100 text-blue-800',
  deferred: 'bg-slate-100 text-slate-600',
};

export default function ConflictDetailPage() {
  const { id } = useParams();
  const [conflict, setConflict] = useState<ArchitectureConflict | null>(null);
  const [artifactNames, setArtifactNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchConflict = useCallback(async () => {
    try {
      const res = await fetch(`/api/conflicts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setConflict(data.conflict || null);
        setArtifactNames(data.artifactNames || {});
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchConflict(); }, [fetchConflict]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
      </div>
    );
  }

  if (!conflict) {
    return (
      <div>
        <Link href="/conflicts" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Conflicts
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Conflict not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/conflicts" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              {TYPE_LABELS[conflict.conflictType] || conflict.conflictType}
            </h1>
            <SeverityBadge severity={conflict.severity} />
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[conflict.resolutionStatus] || ''}`}>
              {conflict.resolutionStatus.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{conflict.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Description</h2>
            <p className="text-sm text-slate-700 mb-4">{conflict.description}</p>

            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-slate-500 mb-1">Detection Method</dt>
                <dd className="text-sm font-medium text-slate-700 capitalize">
                  {conflict.detectionMethod.replace('_', ' ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 mb-1">Detected</dt>
                <dd className="text-sm text-slate-600">{new Date(conflict.createdAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          {/* Affected Artifacts */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Affected Artifacts</h2>
            <div className="space-y-2">
              {conflict.artifactAId && (
                <Link
                  href={`/artifacts/${conflict.artifactAId}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm text-slate-700">
                    {artifactNames[conflict.artifactAId] || conflict.artifactAId}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}
              {conflict.artifactBId && conflict.artifactBId !== conflict.artifactAId && (
                <Link
                  href={`/artifacts/${conflict.artifactBId}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm text-slate-700">
                    {artifactNames[conflict.artifactBId] || conflict.artifactBId}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              )}
            </div>
          </div>

          {/* Resolution form */}
          <ResolutionForm
            conflictId={conflict.id}
            currentStatus={conflict.resolutionStatus}
            currentNotes={conflict.resolutionNotes}
            onUpdated={fetchConflict}
          />
        </div>

        <div className="space-y-6">
          {/* Affected Capabilities */}
          {conflict.affectedCapabilities.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Affected Capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {conflict.affectedCapabilities.map(cap => (
                  <span key={cap} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-mono">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Affected Domains */}
          {conflict.affectedDomains.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Affected Domains</h2>
              <div className="flex flex-wrap gap-2">
                {conflict.affectedDomains.map(d => (
                  <DomainBadge key={d} domain={d} />
                ))}
              </div>
            </div>
          )}

          {/* Resolution info */}
          {conflict.resolvedAt && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Resolution Info</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-xs text-slate-500">Resolved At</dt>
                  <dd className="text-sm text-slate-700">{new Date(conflict.resolvedAt).toLocaleString()}</dd>
                </div>
                {conflict.resolvedBy && (
                  <div>
                    <dt className="text-xs text-slate-500">Resolved By</dt>
                    <dd className="text-sm text-slate-700 font-mono">{conflict.resolvedBy}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
