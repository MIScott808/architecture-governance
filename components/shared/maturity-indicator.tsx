export default function MaturityIndicator({ maturity }: { maturity?: string | null }) {
  const colors: Record<string, string> = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    green: 'bg-emerald-500',
  };
  if (!maturity) return <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />;
  return <span className={`w-3 h-3 rounded-full ${colors[maturity] || 'bg-slate-200'} inline-block`} />;
}
