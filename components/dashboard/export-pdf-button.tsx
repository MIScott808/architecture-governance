'use client';

import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';

export default function ExportPdfButton() {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      // Fetch report data
      const res = await fetch('/api/reports/governance');
      const report = await res.json();

      // Dynamic import jsPDF (client-only)
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 20;

      // Helper: add text and advance y
      const addLine = (text: string, fontSize = 10, style: 'normal' | 'bold' = 'normal') => {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', style);
        doc.text(text, 14, y);
        y += fontSize * 0.5 + 2;
      };

      const addSectionHeader = (text: string) => {
        if (y > 260) { doc.addPage(); y = 20; }
        y += 4;
        doc.setFillColor(30, 91, 168); // mana-blue
        doc.rect(14, y - 5, pageWidth - 28, 8, 'F');
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(text, 16, y);
        doc.setTextColor(0, 0, 0);
        y += 8;
      };

      const checkPageBreak = (needed = 12) => {
        if (y + needed > 280) { doc.addPage(); y = 20; }
      };

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 91, 168);
      doc.text('Architecture Governance Report', 14, y);
      y += 10;
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated: ${new Date(report.generatedAt).toLocaleString()}`, 14, y);
      y += 8;
      doc.setTextColor(0, 0, 0);

      // Divider
      doc.setDrawColor(226, 232, 240);
      doc.line(14, y, pageWidth - 14, y);
      y += 6;

      // Summary Section
      addSectionHeader('Executive Summary');
      const s = report.summary;
      addLine(`Active Artifacts: ${s.activeArtifacts} (${s.totalArtifacts} total)`);
      addLine(`Open Conflicts: ${s.openConflicts} (${s.criticalConflicts} critical, ${s.highConflicts} high)`);
      addLine(`Parked Items: ${s.parkedItems}`);
      addLine(`Active Principles: ${s.activePrinciples}`);
      addLine(`Overall Compliance: ${s.overallCompliance != null ? s.overallCompliance + '%' : 'N/A'}`);
      addLine(`ADM Phase: ${s.admPhase}${s.admCycleName ? ` (${s.admCycleName})` : ''}`);
      addLine(`Capabilities: ${s.capabilities.total} total — ${s.capabilities.green} green, ${s.capabilities.yellow} yellow, ${s.capabilities.red} red`);
      y += 4;

      // Compliance Scorecard
      if (report.complianceScorecard.length > 0) {
        addSectionHeader('Compliance Scorecard');
        report.complianceScorecard.forEach((p: { name: string; domain: string; rate: number | null }) => {
          checkPageBreak();
          const rateStr = p.rate != null ? `${p.rate}%` : 'N/A';
          const status = p.rate === null ? '' : p.rate >= 80 ? ' [PASS]' : p.rate >= 60 ? ' [WARN]' : ' [FAIL]';
          addLine(`  ${p.name} (${p.domain}): ${rateStr}${status}`);
        });
        y += 2;
      }

      // Top Conflicts
      if (report.topConflicts.length > 0) {
        addSectionHeader('Open Conflicts (Top 10)');
        report.topConflicts.forEach((c: { type: string; severity: string; description: string }, i: number) => {
          checkPageBreak(16);
          addLine(`  ${i + 1}. [${c.severity.toUpperCase()}] ${c.type.replace(/_/g, ' ')}`, 9, 'bold');
          // Truncate long descriptions
          const desc = c.description.length > 100 ? c.description.substring(0, 97) + '...' : c.description;
          addLine(`     ${desc}`, 8);
        });
        y += 2;
      }

      // Capabilities at Risk
      if (report.capabilitiesAtRisk.length > 0) {
        addSectionHeader('Capabilities at Risk (Red Maturity)');
        report.capabilitiesAtRisk.forEach((c: { pcfId: string; name: string; score: number | null; criticality: string | null }) => {
          checkPageBreak();
          addLine(`  ${c.pcfId} — ${c.name} (Score: ${c.score ?? 'N/A'}, Criticality: ${c.criticality || 'N/A'})`);
        });
        y += 2;
      }

      // Parked Items
      if (report.parkedItems.length > 0) {
        addSectionHeader('Parked Items');
        report.parkedItems.forEach((p: { name: string; reason: string }) => {
          checkPageBreak();
          addLine(`  ${p.name} — ${p.reason.replace(/_/g, ' ')}`);
        });
      }

      // Footer on every page
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Mana Platform — Architecture Governance | Page ${i} of ${totalPages}`,
          14,
          doc.internal.pageSize.getHeight() - 10
        );
      }

      doc.save('architecture-governance-report.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all disabled:opacity-50"
    >
      {exporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {exporting ? 'Generating...' : 'Export PDF'}
    </button>
  );
}
