'use client';

import { useParams } from 'next/navigation';
import { ArrowLeft, AlertCircle, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ArtifactDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/artifacts" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">Artifact Detail</h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{id}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white rounded-lg text-sm font-medium">
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Details</h2>
            <div className="text-sm text-slate-500">
              Connect to Supabase to load artifact data
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Principle Compliance</h2>
            <div className="text-sm text-slate-500">
              No compliance assessments yet
            </div>
          </div>
        </div>

        {/* Sidebar: Tags */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Domain Tags</h2>
              <button className="text-xs text-mana-blue hover:text-mana-blue-bright font-medium">
                + Add Tag
              </button>
            </div>
            <div className="text-sm text-slate-500">
              Tags will appear here once the artifact is loaded
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Pending validation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
