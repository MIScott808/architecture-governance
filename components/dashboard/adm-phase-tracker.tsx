'use client';

import { ADM_PHASE_ORDER, ADM_PHASE_LABELS } from '@/lib/types/adm';
import type { ADMPhase } from '@/lib/types/adm';
import { CheckCircle2 } from 'lucide-react';

interface ADMPhaseTrackerProps {
  currentPhase: ADMPhase | null;
  compact?: boolean;
}

export default function ADMPhaseTracker({ currentPhase, compact }: ADMPhaseTrackerProps) {
  const currentIndex = currentPhase ? ADM_PHASE_ORDER.indexOf(currentPhase) : -1;

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-2'} overflow-x-auto`}>
      {ADM_PHASE_ORDER.map((phase, index) => {
        const isCompleted = currentIndex > index;
        const isCurrent = currentIndex === index;
        const isFuture = currentIndex < index;

        return (
          <div key={phase} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div
                className={`
                  ${compact ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'}
                  rounded-full flex items-center justify-center font-semibold transition-colors
                  ${isCompleted
                    ? 'bg-mana-teal text-white'
                    : isCurrent
                      ? 'bg-mana-blue text-white ring-2 ring-mana-blue-light ring-offset-2'
                      : 'bg-slate-200 text-slate-400'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle2 className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                ) : (
                  index + 1
                )}
              </div>
              {!compact && (
                <span
                  className={`mt-1.5 text-[10px] font-medium text-center max-w-[72px] leading-tight
                    ${isCompleted ? 'text-mana-teal' : isCurrent ? 'text-mana-blue' : 'text-slate-400'}
                  `}
                >
                  {ADM_PHASE_LABELS[phase]}
                </span>
              )}
            </div>
            {index < ADM_PHASE_ORDER.length - 1 && (
              <div
                className={`
                  ${compact ? 'w-3 h-0.5' : 'w-6 h-0.5'} mx-0.5
                  ${isCompleted ? 'bg-mana-teal' : isFuture || isCurrent ? 'bg-slate-200' : 'bg-slate-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
