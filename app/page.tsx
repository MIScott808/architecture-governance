import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Shield, Layers, AlertTriangle, BarChart3 } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  try {
    const { userId } = await auth();
    if (userId) redirect("/dashboard");
  } catch {
    // Auth not configured yet — show landing page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-mana-navy via-mana-blue-deep to-mana-navy flex items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-mana-blue to-mana-blue-bright mb-6 shadow-lg shadow-mana-blue/30">
          <Shield className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Architecture Governance
        </h1>
        <p className="text-xl text-slate-300 mb-10">
          Cross-cutting governance for the Mana Platform — artifact registry, conflict detection, compliance tracking, and ADM cycle management.
        </p>
        <div className="flex justify-center gap-10 text-slate-400 mb-10">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <span>Artifact Registry</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Conflict Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            <span>Compliance Tracking</span>
          </div>
        </div>
        <SignInButton mode="modal">
          <button className="bg-gradient-to-r from-mana-blue to-mana-blue-bright hover:from-mana-blue-bright hover:to-mana-blue-light text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg shadow-mana-blue/30 transition-all">
            Sign In to Get Started
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
