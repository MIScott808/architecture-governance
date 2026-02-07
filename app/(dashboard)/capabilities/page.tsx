import { Map } from 'lucide-react';

export default function CapabilitiesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Capability Map</h1>
        <p className="text-sm text-slate-500 mt-1">APQC PCF-aligned capability maturity heatmap</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Map className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Capability Heatmap</h3>
        <p className="text-sm text-slate-500">Connect to Supabase to view capability maturity data</p>
      </div>
    </div>
  );
}
