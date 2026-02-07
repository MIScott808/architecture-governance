import { AlertTriangle } from 'lucide-react';

export default function ConflictsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Architecture Conflicts</h1>
        <p className="text-sm text-slate-500 mt-1">Detected conflicts across artifacts, capabilities, and principles</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">No Conflicts Detected</h3>
        <p className="text-sm text-slate-500">Conflicts will appear here as artifacts are registered and analyzed</p>
      </div>
    </div>
  );
}
