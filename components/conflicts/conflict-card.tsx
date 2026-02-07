import Link from 'next/link';
import SeverityBadge from '@/components/shared/severity-badge';
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

export default function ConflictCard({
  conflict,
  artifactNames,
}: {
  conflict: ArchitectureConflict;
  artifactNames?: Record<string, string>;
}) {
  const artNameA = artifactNames?.[conflict.artifactAId] || conflict.artifactAId;
  const artNameB = artifactNames?.[conflict.artifactBId] || conflict.artifactBId;

  return (
    <Link
      href={`/conflicts/${conflict.id}`}
      className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-mana-blue-light hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">
          {TYPE_LABELS[conflict.conflictType] || conflict.conflictType}
        </span>
        <SeverityBadge severity={conflict.severity} />
      </div>

      <p className="text-sm text-slate-700 mb-3 line-clamp-2">{conflict.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {conflict.artifactAId !== conflict.artifactBId ? (
          <>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded truncate max-w-[140px]" title={artNameA}>
              {artNameA}
            </span>
            <span className="text-xs text-slate-400">vs</span>
            <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded truncate max-w-[140px]" title={artNameB}>
              {artNameB}
            </span>
          </>
        ) : (
          <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded truncate max-w-[200px]" title={artNameA}>
            {artNameA}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[conflict.resolutionStatus] || ''}`}>
          {conflict.resolutionStatus.replace('_', ' ')}
        </span>
        <span className="text-xs text-slate-400">
          {new Date(conflict.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
