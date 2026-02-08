'use client';

import { useState, useEffect, useCallback } from 'react';
import { Link2, Plus, X, Loader2 } from 'lucide-react';

interface GapLink {
  id: string;
  requirement_artifact_id: string;
  gap_artifact_id: string;
  link_type: string;
  status: string;
  requirement?: { id: string; artifact_name: string; lifecycle_status: string };
  gap?: { id: string; artifact_name: string; lifecycle_status: string };
}

const LINK_TYPE_LABELS: Record<string, string> = {
  addresses: 'Addresses',
  partially_addresses: 'Partially Addresses',
  blocks: 'Blocks',
  supersedes: 'Supersedes',
};

const LINK_TYPE_COLORS: Record<string, string> = {
  addresses: 'bg-emerald-50 text-emerald-700',
  partially_addresses: 'bg-amber-50 text-amber-700',
  blocks: 'bg-red-50 text-red-700',
  supersedes: 'bg-slate-100 text-slate-600',
};

interface RequirementGapLinksProps {
  artifactId: string;
  artifactType: string; // 'requirement' or 'gap' or other
}

export default function RequirementGapLinks({ artifactId, artifactType }: RequirementGapLinksProps) {
  const [links, setLinks] = useState<GapLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [linkType, setLinkType] = useState('addresses');
  const [saving, setSaving] = useState(false);

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch(`/api/requirement-gap-links?artifactId=${artifactId}`);
      const data = await res.json();
      setLinks(data.links || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [artifactId]);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  async function handleAdd() {
    if (!targetId.trim()) return;
    setSaving(true);
    try {
      const isGap = artifactType === 'gap';
      const res = await fetch('/api/requirement-gap-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requirementArtifactId: isGap ? targetId.trim() : artifactId,
          gapArtifactId: isGap ? artifactId : targetId.trim(),
          linkType,
        }),
      });
      if (res.ok) {
        setShowForm(false);
        setTargetId('');
        fetchLinks();
      }
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-mana-blue" />
          <h2 className="text-lg font-semibold text-slate-900">Requirement-Gap Links</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-xs text-mana-blue hover:text-mana-blue-bright font-medium flex items-center gap-1"
        >
          {showForm ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          {showForm ? 'Cancel' : 'Add Link'}
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-3 bg-slate-50 rounded-lg space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              {artifactType === 'gap' ? 'Requirement Artifact ID' : 'Gap Artifact ID'}
            </label>
            <input
              type="text"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
              placeholder="Paste artifact UUID..."
              className="w-full px-3 py-1.5 border border-slate-200 rounded text-sm focus:ring-2 focus:ring-mana-blue/20 focus:border-mana-blue outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">Link Type</label>
            <select
              value={linkType}
              onChange={(e) => setLinkType(e.target.value)}
              className="w-full px-3 py-1.5 border border-slate-200 rounded text-sm"
            >
              {Object.entries(LINK_TYPE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={!targetId.trim() || saving}
            className="px-3 py-1.5 text-xs text-white bg-gradient-to-r from-mana-blue to-mana-blue-bright rounded font-medium disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Create Link'}
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
        </div>
      ) : links.length === 0 ? (
        <p className="text-sm text-slate-400">No requirement-gap links</p>
      ) : (
        <div className="space-y-2">
          {links.map((link) => {
            const other =
              link.requirement_artifact_id === artifactId
                ? link.gap
                : link.requirement;
            const direction =
              link.requirement_artifact_id === artifactId
                ? 'Gap'
                : 'Requirement';

            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${LINK_TYPE_COLORS[link.link_type] || ''}`}>
                    {LINK_TYPE_LABELS[link.link_type] || link.link_type}
                  </span>
                  <span className="text-xs text-slate-400">{direction}:</span>
                  <span className="text-sm text-slate-700 truncate">
                    {other?.artifact_name || 'Unknown'}
                  </span>
                </div>
                {other?.lifecycle_status && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    other.lifecycle_status === 'active'
                      ? 'bg-emerald-100 text-emerald-700'
                      : other.lifecycle_status === 'archived'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-amber-100 text-amber-700'
                  }`}>
                    {other.lifecycle_status}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
