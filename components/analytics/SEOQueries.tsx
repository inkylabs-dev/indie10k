"use client";

import { useMemo, useState } from 'react';
import type { SEOQueryRow } from '@/lib/analyticsTypes';
import { downloadCSV } from '@/lib/csv';

type SortField = keyof SEOQueryRow;
type SortDirection = 'asc' | 'desc';

interface SEOQueriesProps {
  data: SEOQueryRow[];
  onExport?: () => void;
}

export function SEOQueries({ data, onExport }: SEOQueriesProps) {
  const [sortField, setSortField] = useState<SortField>('clicks');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sorted = useMemo(() => {
    const rows = [...data];
    rows.sort((a, b) => {
      const av = a[sortField];
      const bv = b[sortField];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDirection === 'asc' ? av - bv : bv - av;
      }
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      return sortDirection === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
    });
    return rows;
  }, [data, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDirection('desc'); }
  };

  const handleExport = () => {
    const rows = sorted.map(r => ({
      Query: r.query,
      Clicks: r.clicks,
      Impressions: r.impressions,
      CTR: `${(r.ctr * 100).toFixed(1)}%`,
      'Avg Position': r.avgPosition
    }));
    downloadCSV(rows as any, `seo-queries-${new Date().toISOString().split('T')[0]}.csv`);
    onExport?.();
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">SEO Queries</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              {([
                ['query', 'Query'],
                ['clicks', 'Clicks'],
                ['impressions', 'Impressions'],
                ['ctr', 'CTR'],
                ['avgPosition', 'Avg Pos.']
              ] as [SortField, string][]) .map(([key, label]) => (
                <th key={key} className={`py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${key === 'query' ? 'text-left' : 'text-right'} cursor-pointer`}
                    onClick={() => handleSort(key)}>
                  {label}{' '}
                  {sortField === key ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr key={`${row.query}-${idx}`} className="border-b border-zinc-100 dark:border-zinc-700">
                <td className="py-3 px-4 text-left font-medium text-zinc-900 dark:text-white">{row.query}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.clicks.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.impressions.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{(row.ctr * 100).toFixed(1)}%</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.avgPosition.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

