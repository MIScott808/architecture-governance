'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader2, RefreshCw, XCircle, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import DomainBadge from '@/components/shared/domain-badge';
import type { ParkingLotItem } from '@/lib/types/parking-lot';

const REASON_LABELS: Record<string, string> = {
  budget_constraint: 'Budget Constraint',
  resource_unavailable: 'Resource Unavailable',
  dependency_blocked: 'Dependency Blocked',
  architecture_conflict: 'Architecture Conflict',
  strategic_reprioritization: 'Strategic Reprioritization',
  deferred: 'Deferred',
};

const STATUS_STYLES: Record<string, string> = {
  parked: 'bg-slate-100 text-slate-600',
  under_review: 'bg-amber-100 text-amber-800',
  reactivated: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function ParkingLotDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<ParkingLotItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState(false);

  const fetchItem = useCallback(async () => {
    try {
      const res = await fetch(`/api/parking-lot/${id}`);
      if (res.ok) {
        const data = await res.json();
        setItem(data.item || null);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchItem(); }, [fetchItem]);

  async function handleReactivate() {
    if (!confirm('Reactivate this item and restore its linked artifact to active status?')) return;
    setActing(true);
    try {
      await fetch(`/api/parking-lot/${id}/reactivate`, { method: 'POST' });
      fetchItem();
    } finally {
      setActing(false);
    }
  }

  async function handleCancel() {
    if (!confirm('Cancel this parked item?')) return;
    setActing(true);
    try {
      await fetch(`/api/parking-lot/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' }),
      });
      fetchItem();
    } finally {
      setActing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
      </div>
    );
  }

  if (!item) {
    return (
      <div>
        <Link href="/parking-lot" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Parking Lot
        </Link>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Item not found.</p>
        </div>
      </div>
    );
  }

  const isOverdue = item.reviewDate && new Date(item.reviewDate) < new Date() && item.status === 'parked';

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/parking-lot" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{item.itemName}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[item.status] || ''}`}>
              {item.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{item.id}</p>
        </div>
        {item.status === 'parked' && (
          <div className="flex gap-2">
            <button
              onClick={handleReactivate}
              disabled={acting}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              Reactivate
            </button>
            <button
              onClick={handleCancel}
              disabled={acting}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Details</h2>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-slate-500 mb-1">Type</dt>
                <dd className="text-sm font-medium text-slate-700 capitalize">{item.itemType.replace('_', ' ')}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 mb-1">Reason Parked</dt>
                <dd className="text-sm font-medium text-slate-700">{REASON_LABELS[item.reasonParked] || item.reasonParked}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500 mb-1">Parked At</dt>
                <dd className="text-sm text-slate-600">{new Date(item.parkedAt).toLocaleString()}</dd>
              </div>
              {item.estimatedEffort && (
                <div>
                  <dt className="text-xs text-slate-500 mb-1">Estimated Effort</dt>
                  <dd className="text-sm text-slate-600">{item.estimatedEffort}</dd>
                </div>
              )}
            </dl>
            {item.itemDescription && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <dt className="text-xs text-slate-500 mb-1">Description</dt>
                <dd className="text-sm text-slate-700">{item.itemDescription}</dd>
              </div>
            )}
          </div>

          {item.reactivationCriteria && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Reactivation Criteria</h2>
              <p className="text-sm text-slate-700">{item.reactivationCriteria}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Review date */}
          {item.reviewDate && (
            <div className={`bg-white rounded-xl border p-6 ${
              isOverdue ? 'border-red-200' : 'border-slate-200'
            }`}>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Review Date</h2>
              <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-600' : 'text-slate-600'}`}>
                {isOverdue && <AlertCircle className="w-4 h-4" />}
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{new Date(item.reviewDate).toLocaleDateString()}</span>
              </div>
              {isOverdue && <p className="text-xs text-red-500 mt-1">This review is overdue</p>}
            </div>
          )}

          {/* Affected domains */}
          {item.affectedDomains.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Affected Domains</h2>
              <div className="flex flex-wrap gap-2">
                {item.affectedDomains.map(d => (
                  <DomainBadge key={d} domain={d} />
                ))}
              </div>
            </div>
          )}

          {/* Affected capabilities */}
          {item.affectedCapabilities.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Affected Capabilities</h2>
              <div className="flex flex-wrap gap-2">
                {item.affectedCapabilities.map(cap => (
                  <span key={cap} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-mono">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
