'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

interface ComplianceEntry {
  principleId: string;
  principleName: string;
  complianceRate: number | null;
}

interface ComplianceScorecardProps {
  report: ComplianceEntry[];
}

function getColor(rate: number | null): string {
  if (rate === null) return '#94a3b8'; // slate-400
  if (rate >= 80) return '#0D9488';    // teal
  if (rate >= 60) return '#D69E2E';    // gold
  return '#C41E3A';                     // red
}

export default function ComplianceScorecard({ report }: ComplianceScorecardProps) {
  if (report.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        Define principles to track compliance
      </div>
    );
  }

  const data = report.map((r) => ({
    name: r.principleName.length > 20
      ? r.principleName.substring(0, 18) + '...'
      : r.principleName,
    fullName: r.principleName,
    rate: r.complianceRate ?? 0,
    color: getColor(r.complianceRate),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 10 }}
          width={120}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Compliance']}
          labelFormatter={(_label, payload) => {
            if (payload && payload.length > 0) {
              return (payload[0].payload as { fullName: string }).fullName;
            }
            return _label;
          }}
        />
        <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={18}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
