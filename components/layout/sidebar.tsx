'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Layers, Map, AlertTriangle, ParkingCircle,
  BookOpen, RefreshCw, CheckSquare, Settings, Shield, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Runway Health', icon: LayoutDashboard },
  { href: '/artifacts', label: 'Artifacts', icon: Layers, badgeKey: 'validation' as const },
  { href: '/capabilities', label: 'Capabilities', icon: Map },
  { href: '/conflicts', label: 'Conflicts', icon: AlertTriangle },
  { href: '/parking-lot', label: 'Parking Lot', icon: ParkingCircle },
  { href: '/principles', label: 'Principles', icon: BookOpen },
  { href: '/adm-cycles', label: 'ADM Cycles', icon: RefreshCw },
  { href: '/compliance', label: 'Compliance', icon: CheckSquare },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [validationCount, setValidationCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch('/api/artifacts/validation-queue');
        const data = await res.json();
        setValidationCount(data.count || 0);
      } catch {
        // silently fail
      }
    }
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      className={`flex flex-col h-screen bg-gradient-to-b from-mana-navy to-mana-blue-deep transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-mana-blue to-mana-blue-bright flex items-center justify-center shadow-md shadow-mana-blue/30">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">Architecture</div>
            <div className="text-xs text-mana-blue-pale truncate">Governance</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const badge = item.badgeKey === 'validation' ? validationCount : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-mana-blue to-mana-blue-bright text-white shadow-md shadow-mana-blue/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {badge > 0 && (
                    <span className="px-1.5 py-0.5 bg-amber-500 text-white text-xs rounded-full font-medium min-w-[20px] text-center">
                      {badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && badge > 0 && (
                <span className="absolute right-1 top-0.5 w-2 h-2 bg-amber-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
