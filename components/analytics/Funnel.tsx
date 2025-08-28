"use client";

import type { FunnelStep } from '@/lib/analyticsTypes';

interface FunnelProps {
  data: FunnelStep[];
  compareData?: FunnelStep[];
}

export function Funnel({ data, compareData }: FunnelProps) {
  const max = data.length ? data[0].count : 0;
  const cmpMap = new Map<string, number>(
    (compareData || []).map(s => [s.name, s.count])
  );

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Funnel</h2>
      </div>

      <div className="space-y-4">
        {data.map((step, idx) => {
          const pct = max ? (step.count / max) * 100 : 0;
          const prev = cmpMap.get(step.name);
          const prevPct = prev && max ? (prev / max) * 100 : 0;
          const dropFromPrev = idx === 0 ? 0 : ((data[idx - 1].count - step.count) / data[idx - 1].count) * 100;

          return (
            <div key={step.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-zinc-900 dark:text-white">{step.name}</div>
                <div className="text-zinc-700 dark:text-zinc-300">
                  {step.count.toLocaleString()} {idx > 0 && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400"> (−{isFinite(dropFromPrev) ? dropFromPrev.toFixed(1) : '0.0'}%)</span>
                  )}
                </div>
              </div>
              <div className="relative w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
                <div className="absolute left-0 top-0 h-3 bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                {prev !== undefined && (
                  <div className="absolute left-0 top-0 h-3 bg-blue-300/70 dark:bg-blue-500/40 rounded-full" style={{ width: `${prevPct}%` }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

