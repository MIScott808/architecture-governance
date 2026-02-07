import Link from 'next/link';
import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import DomainBadge from '@/components/shared/domain-badge';
import type { ArchitectureArtifact } from '@/lib/types/artifacts';

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

export default function ArtifactCard({ artifact }: { artifact: ArchitectureArtifact }) {
  return (
    <Link
      href={`/artifacts/${artifact.id}`}
      className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-mana-blue-light hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{artifact.artifactName}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[artifact.lifecycleStatus] || ''}`}>
          {artifact.lifecycleStatus.replace('_', ' ')}
        </span>
      </div>
      {artifact.artifactDescription && (
        <p className="text-xs text-slate-500 mb-3 line-clamp-2">{artifact.artifactDescription}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {SOURCE_LABELS[artifact.sourceModule] || artifact.sourceModule}
          </span>
          {artifact.tags?.map(tag => (
            <DomainBadge key={tag.id} domain={tag.domain} />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {artifact.humanValidated ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : artifact.autoTagConfidence != null && artifact.autoTagConfidence < 0.7 ? (
            <AlertCircle className="w-4 h-4 text-amber-500" />
          ) : null}
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </Link>
  );
}
