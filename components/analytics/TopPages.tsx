"use client";

import { useMemo, useState, useRef } from 'react';
import type { PageRow } from '@/lib/analyticsTypes';
import { downloadCSV } from '@/lib/csv';

type SortField = keyof PageRow;
type SortDirection = 'asc' | 'desc';

interface TopPagesProps {
  data: PageRow[];
  onDataUpdate: (rows: PageRow[]) => void;
  onExport?: () => void;
  onImport?: () => void;
}

export function TopPages({ data, onDataUpdate, onExport, onImport }: TopPagesProps) {
  const [sortField, setSortField] = useState<SortField>('pageviews');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const maxPageviews = Math.max(...data.map(r => r.pageviews));

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    const rows = sorted.map(r => ({
      Path: r.path,
      Pageviews: r.pageviews,
      Visitors: r.visitors,
      'Avg Time (sec)': r.avgTimeOnPageSec,
      Entrances: r.entrances,
      'Bounce Rate': `${(r.bounceRate * 100).toFixed(1)}%`
    }));
    // downloadCSV is typed for IncomeEntry[], but it just serializes objects. Cast to any.
    downloadCSV(rows as any, `top-pages-${new Date().toISOString().split('T')[0]}.csv`);
    onExport?.();
  };

  const parseTopPagesCSV = (csv: string): PageRow[] => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const find = (name: string) => headers.indexOf(name);

    return lines.slice(1).map(line => {
      const cols = line.split(',').map(v => v.trim());
      const getNum = (i: number, fallback = 0) => {
        const n = parseFloat(cols[i] || '');
        return isNaN(n) ? fallback : n;
      };
      const pathIdx = find('path');
      const pageviewsIdx = find('pageviews');
      const visitorsIdx = find('visitors');
      const avgIdx = find('avgtimeonpagesec');
      const entrancesIdx = find('entrances');
      const bounceIdx = find('bouncerate');
      const bouncePctIdx = bounceIdx === -1 ? find('bounce rate') : bounceIdx;

      const path = pathIdx >= 0 ? cols[pathIdx] : '/';
      const pageviews = getNum(pageviewsIdx);
      const visitors = getNum(visitorsIdx);
      const avgTimeOnPageSec = getNum(avgIdx);
      const entrances = getNum(entrancesIdx);
      let bounceRate = 0;
      if (bouncePctIdx >= 0) {
        const raw = cols[bouncePctIdx] || '0';
        const pct = raw.endsWith('%') ? parseFloat(raw) / 100 : parseFloat(raw);
        bounceRate = isNaN(pct) ? 0 : pct;
      }
      return { path, pageviews, visitors, avgTimeOnPageSec, entrances, bounceRate } as PageRow;
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const rows = parseTopPagesCSV(text);
    if (rows.length) {
      onDataUpdate(rows);
    }
    onImport?.();
    e.target.value = '';
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Top Pages</h2>
        <div className="flex items-center gap-2">
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          <button
            onClick={handleImportClick}
            className="px-3 py-2 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-600"
          >
            Import CSV
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {sorted.slice(0, 8).map(row => (
          <div key={row.path} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium text-zinc-900 dark:text-white truncate max-w-[60%]" title={row.path}>
                {row.path}
              </div>
              <span className="text-zinc-700 dark:text-zinc-300">{row.pageviews.toLocaleString()} views</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(row.pageviews / maxPageviews) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              {([
                ['path', 'Path'],
                ['pageviews', 'Pageviews'],
                ['visitors', 'Visitors'],
                ['avgTimeOnPageSec', 'Avg Time (s)'],
                ['entrances', 'Entrances'],
                ['bounceRate', 'Bounce Rate']
              ] as [SortField, string][]) .map(([key, label]) => (
                <th key={key} className={`py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 ${key === 'path' ? 'text-left' : 'text-right'} cursor-pointer`}
                    onClick={() => handleSort(key)}>
                  {label}{' '}
                  {sortField === key ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr key={`${row.path}-${idx}`} className="border-b border-zinc-100 dark:border-zinc-700">
                <td className="py-3 px-4 text-left font-medium text-zinc-900 dark:text-white">{row.path}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.pageviews.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.visitors.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.avgTimeOnPageSec.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{row.entrances.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-zinc-900 dark:text-white">{(row.bounceRate * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

