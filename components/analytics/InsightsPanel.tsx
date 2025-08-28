"use client";

import type { KPI, AttributionRow, PageRow, SEOQueryRow, TimePoint } from '@/lib/analyticsTypes';

interface InsightsPanelProps {
  kpi: KPI;
  attribution: AttributionRow[];
  pages: PageRow[];
  seoQueries: SEOQueryRow[];
  timeSeries: TimePoint[];
}

export function InsightsPanel({ kpi, attribution, pages, seoQueries, timeSeries }: InsightsPanelProps) {
  const topSource = [...attribution].sort((a, b) => b.visitors - a.visitors)[0];
  const topPage = [...pages].sort((a, b) => b.pageviews - a.pageviews)[0];
  const topQuery = [...seoQueries].sort((a, b) => b.clicks - a.clicks)[0];

  const today = timeSeries[timeSeries.length - 1];
  const last7 = timeSeries.slice(-7);
  const avg7 = last7.length ? Math.round(last7.reduce((s, p) => s + p.visitors, 0) / last7.length) : 0;

  const goalPct = kpi.goalThisMonth > 0 ? Math.min(100, (kpi.goalMonthToDate / kpi.goalThisMonth) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Goal Progress */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="text-sm font-medium text-zinc-900 dark:text-white mb-2">Monthly Goal</div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-700 dark:text-zinc-300">${kpi.goalMonthToDate.toLocaleString()}</span>
          <span className="text-zinc-600 dark:text-zinc-400">of ${kpi.goalThisMonth.toLocaleString()}</span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
          <div className={`h-3 rounded-full ${goalPct >= 100 ? 'bg-green-500 dark:bg-green-400' : 'bg-blue-600 dark:bg-blue-500'}`} style={{ width: `${goalPct}%` }} />
        </div>
        <div className="text-center text-xs text-zinc-600 dark:text-zinc-400 mt-2">{goalPct.toFixed(1)}% of goal</div>
      </div>

      {/* Top Items */}
      {topSource && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-sm font-medium text-zinc-900 dark:text-white mb-1">Top Source</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">{topSource.source} ({topSource.medium})</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{topSource.visitors.toLocaleString()} visitors</div>
        </div>
      )}

      {topPage && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-sm font-medium text-zinc-900 dark:text-white mb-1">Top Page</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300 truncate" title={topPage.path}>{topPage.path}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{topPage.pageviews.toLocaleString()} pageviews</div>
        </div>
      )}

      {topQuery && (
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-sm font-medium text-zinc-900 dark:text-white mb-1">Top Query</div>
          <div className="text-sm text-zinc-700 dark:text-zinc-300">{topQuery.query}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">{topQuery.clicks.toLocaleString()} clicks • {(topQuery.ctr * 100).toFixed(1)}% CTR</div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
          <div className="text-lg font-semibold text-zinc-900 dark:text-white">{today ? today.visitors.toLocaleString() : '-'}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">Today Visitors</div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 text-center">
          <div className="text-lg font-semibold text-zinc-900 dark:text-white">{avg7.toLocaleString()}</div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400">7D Avg Visitors</div>
        </div>
      </div>
    </div>
  );
}

