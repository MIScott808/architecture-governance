'use client';

import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-mana-blue" />
            <span className="text-sm font-semibold text-slate-800">AGA</span>
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: 'flex items-center',
                organizationSwitcherTrigger: 'text-sm text-slate-600 hover:text-slate-900',
              },
            }}
          />
        </div>
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
