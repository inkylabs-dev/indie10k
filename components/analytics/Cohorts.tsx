"use client";

import { useMemo } from 'react';
import type { CohortCell } from '@/lib/analyticsTypes';
import { downloadCSV } from '@/lib/csv';

interface CohortsProps {
  data: CohortCell[];
  onExport?: () => void;
}

export function Cohorts({ data, onExport }: CohortsProps) {
  const { rows, weeks } = useMemo(() => {
    const byCohort = new Map<string, CohortCell[]>();
    const maxWeek = Math.max(0, ...data.map(c => c.weekIndex));
    data.forEach(c => {
      const arr = byCohort.get(c.cohortWeekISO) || [];
      arr.push(c);
      byCohort.set(c.cohortWeekISO, arr);
    });
    const sortedCohorts = Array.from(byCohort.keys()).sort().reverse();
    return {
      rows: sortedCohorts.map(ck => {
        const cells = byCohort.get(ck) || [];
        const map = new Map<number, CohortCell>();
        cells.forEach(cell => map.set(cell.weekIndex, cell));
        return { cohort: ck, cells: Array.from({ length: maxWeek + 1 }, (_, i) => map.get(i) || { cohortWeekISO: ck, weekIndex: i, activePct: 0 }) };
      }),
      weeks: Array.from({ length: (Math.max(0, ...data.map(c => c.weekIndex)) + 1) }, (_, i) => i)
    };
  }, [data]);

  const scale = (v: number) => {
    // v is 0..1
    const light = 230;
    const dark = 30;
    const g = Math.round(light - (light - 120) * v);
    const b = Math.round(light - (light - 60) * v);
    const r = Math.round(light - (light - 40) * v);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleExport = () => {
    const rowsFlat = data.map(c => ({
      Cohort: c.cohortWeekISO,
      Week: c.weekIndex,
      'Active %': (c.activePct * 100).toFixed(1)
    }));
    downloadCSV(rowsFlat as any, `cohorts-${new Date().toISOString().split('T')[0]}.csv`);
    onExport?.();
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Cohorts</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white dark:bg-zinc-800 py-2 pr-4 text-left font-medium text-zinc-700 dark:text-zinc-300">Cohort</th>
              {weeks.map(w => (
                <th key={w} className="px-1 py-2 text-center font-medium text-zinc-700 dark:text-zinc-300">W{w}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.cohort} className="border-t border-zinc-200 dark:border-zinc-700">
                <td className="sticky left-0 bg-white dark:bg-zinc-800 pr-4 py-2 font-medium text-zinc-900 dark:text-white">{row.cohort}</td>
                {row.cells.map(c => (
                  <td key={c.weekIndex} className="px-1 py-1">
                    <div
                      className="w-6 h-6 rounded"
                      title={`${(c.activePct * 100).toFixed(1)}%`}
                      style={{ backgroundColor: scale(c.activePct) }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

