import { CheckSquare } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Compliance Scorecard</h1>
        <p className="text-sm text-slate-500 mt-1">Principle compliance across all artifacts</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <CheckSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Compliance Report</h3>
        <p className="text-sm text-slate-500">Define principles and assess artifacts to generate the scorecard</p>
      </div>
    </div>
  );
}
