'use client';

import { useState, useEffect, useCallback } from 'react';
import { ParkingCircle, Plus, Loader2, Search } from 'lucide-react';
import type { ParkingLotItem, ParkingStatus } from '@/lib/types/parking-lot';
import ParkedItemCard from '@/components/parking-lot/parked-item-card';
import ParkFormModal from '@/components/parking-lot/park-form-modal';

const STATUS_TABS: { value: ParkingStatus | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'parked', label: 'Parked' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'reactivated', label: 'Reactivated' },
  { value: 'cancelled', label: 'Cancelled' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'requirement', label: 'Requirement' },
  { value: 'initiative', label: 'Initiative' },
  { value: 'program', label: 'Program' },
  { value: 'capability_gap', label: 'Capability Gap' },
];

export default function ParkingLotPage() {
  const [items, setItems] = useState<ParkingLotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (typeFilter) params.set('type', typeFilter);
      const res = await fetch(`/api/parking-lot?${params}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = items.filter(item => {
    if (search && !item.itemName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Parking Lot</h1>
          <p className="text-sm text-slate-500 mt-1">
            Deferred items awaiting reactivation or cancellation
            {items.length > 0 && <span className="ml-2 text-slate-400">({items.length} items)</span>}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Park Item
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-200">
        {STATUS_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => { setStatusFilter(tab.value); setLoading(true); }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              statusFilter === tab.value
                ? 'border-mana-blue text-mana-blue'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setLoading(true); }}
          className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
        >
          {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-mana-blue" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <ParkingCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Parking Lot Empty</h3>
          <p className="text-sm text-slate-500 mb-4">Items moved to the parking lot will appear here</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Park First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(item => (
            <ParkedItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {showModal && (
        <ParkFormModal
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); fetchItems(); }}
        />
      )}
    </div>
  );
}
