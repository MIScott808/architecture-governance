import { RefreshCw, Plus } from 'lucide-react';

export default function ADMCyclesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ADM Cycles</h1>
          <p className="text-sm text-slate-500 mt-1">TOGAF Architecture Development Method cycle tracking</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium hover:shadow-md transition-all">
          <Plus className="w-4 h-4" />
          Start New Cycle
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No ADM Cycles</h3>
        <p className="text-sm text-slate-500">Start an ADM cycle to track architecture evolution</p>
      </div>
    </div>
  );
}
