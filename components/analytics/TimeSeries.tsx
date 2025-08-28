"use client";

import { useState, useMemo } from 'react';
import type { TimePoint, CompareData } from '@/lib/analyticsTypes';
import { formatDate } from '@/lib/date';

interface TimeSeriesProps {
  data: CompareData<TimePoint[]>;
}

export function TimeSeries({ data }: TimeSeriesProps) {
  const [activeMetrics, setActiveMetrics] = useState({
    visitors: true,
    sessions: true,
    pageviews: false,
    signups: true,
    revenue: false
  });

  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(null);

  const metrics = [
    { key: 'visitors', label: 'Visitors', color: '#3b82f6' },
    { key: 'sessions', label: 'Sessions', color: '#10b981' },
    { key: 'pageviews', label: 'Pageviews', color: '#f59e0b' },
    { key: 'signups', label: 'Signups', color: '#ef4444' },
    { key: 'revenue', label: 'Revenue', color: '#8b5cf6' }
  ] as const;

  const chartData = useMemo(() => {
    const current = data.current || [];
    const previous = data.previous || [];
    
    return {
      current,
      previous,
      maxValues: metrics.reduce((acc, metric) => {
        const currentMax = Math.max(...current.map(d => d[metric.key] || 0));
        const previousMax = previous.length ? Math.max(...previous.map(d => d[metric.key] || 0)) : 0;
        acc[metric.key] = Math.max(currentMax, previousMax);
        return acc;
      }, {} as Record<string, number>)
    };
  }, [data, metrics]);

  const svgWidth = 800;
  const svgHeight = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = svgWidth - padding.left - padding.right;
  const chartHeight = svgHeight - padding.top - padding.bottom;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Traffic & Performance</h2>
        
        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-2">
          {metrics.map(metric => (
            <button
              key={metric.key}
              onClick={() => setActiveMetrics(prev => ({
                ...prev,
                [metric.key]: !prev[metric.key]
              }))}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
                activeMetrics[metric.key]
                  ? 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
              aria-pressed={activeMetrics[metric.key]}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: activeMetrics[metric.key] ? metric.color : '#d1d5db' }}
              />
              {metric.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simple Chart Placeholder */}
      <div className="relative bg-zinc-50 dark:bg-zinc-900 rounded-lg p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Time Series Chart</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Interactive line chart showing {chartData.current.length} data points</p>
          </div>
        </div>
      </div>
    </div>
  );
}