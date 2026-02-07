export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure the Architecture Governance module</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Database Connection</h2>
        <div className="text-sm text-slate-500">
          Configure your Supabase connection in environment variables.
        </div>
      </div>
    </div>
  );
}
