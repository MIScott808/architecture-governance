'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

interface Conflict {
  conflictType: string;
  severity: string;
}

interface ConflictChartProps {
  conflicts: Conflict[];
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#C41E3A',
  high: '#F05545',
  medium: '#D69E2E',
  low: '#0D9488',
};

const TYPE_LABELS: Record<string, string> = {
  capability_overlap: 'Capability Overlap',
  principle_violation: 'Principle Violation',
  resource_contention: 'Resource Contention',
  data_ownership: 'Data Ownership',
  integration_conflict: 'Integration',
  timeline_conflict: 'Timeline',
  technology_divergence: 'Tech Divergence',
  scope_overlap: 'Scope Overlap',
};

export default function ConflictChart({ conflicts }: ConflictChartProps) {
  if (conflicts.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        No open conflicts detected
      </div>
    );
  }

  // Group by type, then count per severity
  const typeMap: Record<string, Record<string, number>> = {};
  conflicts.forEach((c) => {
    if (!typeMap[c.conflictType]) {
      typeMap[c.conflictType] = { critical: 0, high: 0, medium: 0, low: 0 };
    }
    typeMap[c.conflictType][c.severity] = (typeMap[c.conflictType][c.severity] || 0) + 1;
  });

  const data = Object.entries(typeMap).map(([type, severities]) => ({
    type: TYPE_LABELS[type] || type,
    ...severities,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="type"
          tick={{ fontSize: 10 }}
          angle={-20}
          textAnchor="end"
          height={60}
        />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="critical" stackId="a" fill={SEVERITY_COLORS.critical} name="Critical" />
        <Bar dataKey="high" stackId="a" fill={SEVERITY_COLORS.high} name="High" />
        <Bar dataKey="medium" stackId="a" fill={SEVERITY_COLORS.medium} name="Medium" />
        <Bar dataKey="low" stackId="a" fill={SEVERITY_COLORS.low} name="Low" />
      </BarChart>
    </ResponsiveContainer>
  );
}
