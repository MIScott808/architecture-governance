export default function DomainBadge({ domain }: { domain: string }) {
  const styles: Record<string, string> = {
    business: 'bg-blue-100 text-blue-800 border-blue-200',
    information: 'bg-purple-100 text-purple-800 border-purple-200',
    technology: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cross_cutting: 'bg-slate-100 text-slate-800 border-slate-200',
  };
  const labels: Record<string, string> = {
    business: 'Business',
    information: 'Information',
    technology: 'Technology',
    cross_cutting: 'Cross-Cutting',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[domain] || styles.business}`}>
      {labels[domain] || domain}
    </span>
  );
}
