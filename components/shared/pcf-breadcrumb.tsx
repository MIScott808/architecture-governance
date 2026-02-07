import { ChevronRight } from 'lucide-react';

export default function PCFBreadcrumb({ pcfId, pcfName }: { pcfId?: string; pcfName?: string }) {
  if (!pcfId) return <span className="text-sm text-slate-400">No PCF mapping</span>;
  const parts = pcfId.split('.');
  return (
    <div className="flex items-center gap-1 text-sm text-slate-600">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
          <span>{parts.slice(0, i + 1).join('.')}</span>
        </span>
      ))}
      {pcfName && (
        <>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-medium">{pcfName}</span>
        </>
      )}
    </div>
  );
}
