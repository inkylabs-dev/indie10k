"use client";

import { useState, useMemo } from 'react';
import type { AttributionRow } from '@/lib/analyticsTypes';
import { downloadCSVGeneric } from '@/lib/csv';

interface AttributionProps {
  data: AttributionRow[];
  onExport?: () => void;
}

type SortField = keyof AttributionRow;
type SortDirection = 'asc' | 'desc';

export function Attribution({ data, onExport }: AttributionProps) {
  const [sortField, setSortField] = useState<SortField>('visitors');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal || '').toLowerCase();
      const bStr = String(bVal || '').toLowerCase();
      
      if (sortDirection === 'asc') {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }, [data, sortField, sortDirection]);

  const maxVisitors = Math.max(...data.map(row => row.visitors));

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleExport = () => {
    const exportData = sortedData.map(row => ({
      Source: row.source,
      Medium: row.medium,
      Campaign: row.campaign || '',
      Visitors: row.visitors,
      Signups: row.signups,
      'Conversion Rate': `${((row.signups / row.visitors) * 100).toFixed(2)}%`,
      Revenue: row.revenue
    }));
    
    downloadCSVGeneric(exportData, `attribution-${new Date().toISOString().split('T')[0]}.csv`);
    onExport?.();
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Attribution</h2>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Export CSV
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {sortedData.slice(0, 8).map((row, index) => (
          <div key={`${row.source}-${row.medium}`} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">
                  {row.source}
                </span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  ({row.medium})
                </span>
              </div>
              <span className="text-zinc-700 dark:text-zinc-300">
                {row.visitors.toLocaleString()} visitors
              </span>
            </div>
            
            <div className="relative">
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(row.visitors / maxVisitors) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Source</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Medium</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Visitors</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Signups</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="border-b border-zinc-100 dark:border-zinc-700">
                <td className="py-3 px-4 font-medium text-zinc-900 dark:text-white">{row.source}</td>
                <td className="py-3 px-4 text-zinc-700 dark:text-zinc-300">{row.medium}</td>
                <td className="py-3 px-4 text-right font-medium text-zinc-900 dark:text-white">{row.visitors.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-medium text-zinc-900 dark:text-white">{row.signups.toLocaleString()}</td>
                <td className="py-3 px-4 text-right font-medium text-zinc-900 dark:text-white">${row.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
