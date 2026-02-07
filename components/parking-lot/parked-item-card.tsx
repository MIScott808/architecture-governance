import Link from 'next/link';
import { Calendar, AlertCircle } from 'lucide-react';
import DomainBadge from '@/components/shared/domain-badge';
import type { ParkingLotItem } from '@/lib/types/parking-lot';

const TYPE_STYLES: Record<string, string> = {
  requirement: 'bg-blue-100 text-blue-800',
  initiative: 'bg-purple-100 text-purple-800',
  program: 'bg-indigo-100 text-indigo-800',
  capability_gap: 'bg-amber-100 text-amber-800',
};

const STATUS_STYLES: Record<string, string> = {
  parked: 'bg-slate-100 text-slate-600',
  under_review: 'bg-amber-100 text-amber-800',
  reactivated: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

const REASON_LABELS: Record<string, string> = {
  budget_constraint: 'Budget Constraint',
  resource_unavailable: 'Resource Unavailable',
  dependency_blocked: 'Dependency Blocked',
  architecture_conflict: 'Architecture Conflict',
  strategic_reprioritization: 'Strategic Reprioritization',
  deferred: 'Deferred',
};

export default function ParkedItemCard({ item }: { item: ParkingLotItem }) {
  const isOverdue = item.reviewDate && new Date(item.reviewDate) < new Date() && item.status === 'parked';

  return (
    <Link
      href={`/parking-lot/${item.id}`}
      className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-mana-blue-light hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 flex-1">{item.itemName}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${STATUS_STYLES[item.status] || ''}`}>
          {item.status.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_STYLES[item.itemType] || ''}`}>
          {item.itemType.replace('_', ' ')}
        </span>
        {item.affectedDomains.map(d => (
          <DomainBadge key={d} domain={d} />
        ))}
      </div>

      <p className="text-xs text-slate-500 mb-3">
        {REASON_LABELS[item.reasonParked] || item.reasonParked}
      </p>

      {item.reviewDate && (
        <div className={`flex items-center gap-1.5 text-xs ${
          isOverdue ? 'text-red-600 font-medium' : 'text-slate-400'
        }`}>
          {isOverdue && <AlertCircle className="w-3.5 h-3.5" />}
          <Calendar className="w-3.5 h-3.5" />
          <span>Review: {new Date(item.reviewDate).toLocaleDateString()}</span>
          {isOverdue && <span className="ml-1">(overdue)</span>}
        </div>
      )}
    </Link>
  );
}
