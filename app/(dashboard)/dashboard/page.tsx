import { Shield, Layers, AlertTriangle, ParkingCircle, CheckSquare, RefreshCw } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Architecture Runway Health</h1>
        <p className="text-sm text-slate-500 mt-1">Cross-cutting governance overview across the Mana Platform</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Artifacts', value: '—', icon: Layers, color: 'from-mana-blue to-mana-blue-bright' },
          { label: 'Open Conflicts', value: '—', icon: AlertTriangle, color: 'from-mana-coral to-mana-red-bright' },
          { label: 'Parked Items', value: '—', icon: ParkingCircle, color: 'from-purple-500 to-purple-600' },
          { label: 'Compliance', value: '—', icon: CheckSquare, color: 'from-mana-teal to-mana-teal-light' },
          { label: 'Principles', value: '—', icon: Shield, color: 'from-mana-gold to-mana-gold-light' },
          { label: 'ADM Phase', value: '—', icon: RefreshCw, color: 'from-slate-500 to-slate-600' },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color}`}>
                <card.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-slate-500">{card.label}</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{card.value}</div>
          </div>
        ))}
      </div>

      {/* Placeholder Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Capability Maturity Heatmap</h2>
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Connect to Supabase to view capability data
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Conflict Severity Distribution</h2>
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            No conflicts detected yet
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Principle Compliance Scorecard</h2>
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Define principles to track compliance
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">ADM Cycle Tracker</h2>
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Start an ADM cycle to track progress
          </div>
        </div>
      </div>
    </div>
  );
}
