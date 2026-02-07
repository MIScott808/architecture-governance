import { Trash2, Edit2 } from 'lucide-react';
import DomainBadge from '@/components/shared/domain-badge';
import type { ArchitecturePrinciple } from '@/lib/types/artifacts';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  deprecated: 'bg-slate-100 text-slate-600',
  draft: 'bg-amber-100 text-amber-800',
};

export default function PrincipleCard({
  principle,
  onEdit,
  onDelete,
}: {
  principle: ArchitecturePrinciple;
  onEdit: (p: ArchitecturePrinciple) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-mana-blue-light transition-all">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 flex-1">
          {principle.principleName}
        </h3>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[principle.status] || ''}`}>
            {principle.status}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <DomainBadge domain={principle.domain} />
        <span className="text-xs text-slate-400">Priority: {principle.priority}</span>
      </div>

      {principle.rationale && (
        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{principle.rationale}</p>
      )}

      {principle.implications && (
        <p className="text-xs text-slate-400 mb-3 line-clamp-2">
          <span className="font-medium text-slate-500">Implications:</span> {principle.implications}
        </p>
      )}

      <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
        <button
          onClick={() => onEdit(principle)}
          className="p-1.5 text-slate-400 hover:text-mana-blue rounded-md hover:bg-slate-50 transition-colors"
          title="Edit principle"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(principle.id)}
          className="p-1.5 text-slate-400 hover:text-mana-coral rounded-md hover:bg-slate-50 transition-colors"
          title="Delete principle"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
