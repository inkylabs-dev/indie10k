"use client";

import { useState } from 'react';
import type { KPI, DateRange, Segments, CompareData } from '@/lib/analyticsTypes';
import { getDatePresets } from '@/lib/date';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface AnalyticsHeaderProps {
  kpi: CompareData<KPI>;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  segments: Segments;
  onSegmentsChange: (segments: Segments) => void;
  compareEnabled: boolean;
  onCompareToggle: (enabled: boolean) => void;
}

export function AnalyticsHeader({
  kpi,
  dateRange,
  onDateRangeChange,
  segments,
  onSegmentsChange,
  compareEnabled,
  onCompareToggle
}: AnalyticsHeaderProps) {
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [showSegments, setShowSegments] = useState(false);
  const presets = getDatePresets();

  const formatKPI = (value: number, type: 'number' | 'currency' | 'percentage') => {
    if (type === 'currency') return `$${value.toLocaleString()}`;
    if (type === 'percentage') return `${(value * 100).toFixed(1)}%`;
    return value.toLocaleString();
  };

  const getDelta = (current: number, previous?: number) => {
    if (!previous || !compareEnabled) return null;
    const delta = ((current - previous) / previous) * 100;
    return {
      value: delta,
      positive: delta >= 0,
      text: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`
    };
  };

  const goalProgress = (kpi.current.goalMonthToDate / kpi.current.goalThisMonth) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Visitors</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatKPI(kpi.current.visitors, 'number')}</div>
          {getDelta(kpi.current.visitors, kpi.previous?.visitors) && (
            <div className={`text-sm ${getDelta(kpi.current.visitors, kpi.previous?.visitors)?.positive ? 'text-green-600' : 'text-red-600'}`}>
              {getDelta(kpi.current.visitors, kpi.previous?.visitors)?.text}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Signups</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatKPI(kpi.current.signups, 'number')}</div>
          {getDelta(kpi.current.signups, kpi.previous?.signups) && (
            <div className={`text-sm ${getDelta(kpi.current.signups, kpi.previous?.signups)?.positive ? 'text-green-600' : 'text-red-600'}`}>
              {getDelta(kpi.current.signups, kpi.previous?.signups)?.text}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Conv. Rate</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatKPI(kpi.current.conversionRate, 'percentage')}</div>
          {getDelta(kpi.current.conversionRate, kpi.previous?.conversionRate) && (
            <div className={`text-sm ${getDelta(kpi.current.conversionRate, kpi.previous?.conversionRate)?.positive ? 'text-green-600' : 'text-red-600'}`}>
              {getDelta(kpi.current.conversionRate, kpi.previous?.conversionRate)?.text}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Active Users</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatKPI(kpi.current.activeUsers, 'number')}</div>
          {getDelta(kpi.current.activeUsers, kpi.previous?.activeUsers) && (
            <div className={`text-sm ${getDelta(kpi.current.activeUsers, kpi.previous?.activeUsers)?.positive ? 'text-green-600' : 'text-red-600'}`}>
              {getDelta(kpi.current.activeUsers, kpi.previous?.activeUsers)?.text}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Revenue</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{formatKPI(kpi.current.revenue, 'currency')}</div>
          {getDelta(kpi.current.revenue, kpi.previous?.revenue) && (
            <div className={`text-sm ${getDelta(kpi.current.revenue, kpi.previous?.revenue)?.positive ? 'text-green-600' : 'text-red-600'}`}>
              {getDelta(kpi.current.revenue, kpi.previous?.revenue)?.text}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Goal Progress</div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{goalProgress.toFixed(0)}%</div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, goalProgress)}%` }}
            />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            ${kpi.current.goalMonthToDate} / ${kpi.current.goalThisMonth}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Date Range Presets */}
          <div className="flex flex-wrap gap-2">
            {presets.map(preset => (
              <button
                key={preset.value}
                onClick={() => onDateRangeChange({ from: preset.from, to: preset.to, preset: preset.value })}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  dateRange.preset === preset.value
                    ? 'bg-blue-600 text-white' 
                    : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
                }`}
                aria-pressed={dateRange.preset === preset.value}
              >
                {preset.label}
              </button>
            ))}
            <button
              onClick={() => setShowCustomDate(!showCustomDate)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                dateRange.preset === 'Custom' || showCustomDate
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
              }`}
              aria-expanded={showCustomDate}
              aria-controls="custom-date-inputs"
            >
              Custom
            </button>
          </div>

          {/* Compare Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={compareEnabled}
              onChange={(e) => onCompareToggle(e.target.checked)}
              className="sr-only"
            />
            <div className={`relative w-11 h-6 rounded-full transition-colors ${compareEnabled ? 'bg-blue-600' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${compareEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">Compare to previous period</span>
          </label>

          {/* Segments Button */}
          <button
            onClick={() => setShowSegments(!showSegments)}
            className="px-3 py-1 text-sm rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            aria-expanded={showSegments}
            aria-controls="segments-panel"
          >
            Segments ({[...segments.devices, ...segments.countries, ...segments.sources, ...segments.mediums].length})
          </button>
        </div>

        {/* Custom Date Inputs */}
        {showCustomDate && (
          <div id="custom-date-inputs" className="mt-4 flex gap-4 items-center">
            <div>
              <label htmlFor="date-from" className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">From</label>
              <input
                id="date-from"
                type="date"
                value={new Date(dateRange.from as any).toISOString().split('T')[0]}
                onChange={(e) => onDateRangeChange({
                  ...dateRange,
                  from: new Date(e.target.value),
                  preset: 'Custom'
                })}
                className="px-3 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="date-to" className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">To</label>
              <input
                id="date-to"
                type="date"
                value={new Date(dateRange.to as any).toISOString().split('T')[0]}
                onChange={(e) => onDateRangeChange({
                  ...dateRange,
                  to: new Date(e.target.value),
                  preset: 'Custom'
                })}
                className="px-3 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Segments Panel */}
        {showSegments && (
          <div id="segments-panel" className="mt-4 p-4 border border-zinc-200 dark:border-zinc-700 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Device</label>
                <div className="space-y-1">
                  {['Desktop', 'Mobile'].map(device => (
                    <label key={device} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={segments.devices.includes(device as any)}
                        onChange={(e) => {
                          const newDevices = e.target.checked 
                            ? [...segments.devices, device as any]
                            : segments.devices.filter(d => d !== device);
                          onSegmentsChange({ ...segments, devices: newDevices });
                        }}
                        className="rounded border-zinc-300 dark:border-zinc-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Country</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia'].map(country => (
                    <label key={country} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={segments.countries.includes(country)}
                        onChange={(e) => {
                          const newCountries = e.target.checked 
                            ? [...segments.countries, country]
                            : segments.countries.filter(c => c !== country);
                          onSegmentsChange({ ...segments, countries: newCountries });
                        }}
                        className="rounded border-zinc-300 dark:border-zinc-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{country}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Source</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {['google', 'twitter', 'reddit', 'direct', 'newsletter'].map(source => (
                    <label key={source} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={segments.sources.includes(source)}
                        onChange={(e) => {
                          const newSources = e.target.checked 
                            ? [...segments.sources, source]
                            : segments.sources.filter(s => s !== source);
                          onSegmentsChange({ ...segments, sources: newSources });
                        }}
                        className="rounded border-zinc-300 dark:border-zinc-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{source}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Medium</label>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {['organic', 'social', 'email', 'referral', 'cpc'].map(medium => (
                    <label key={medium} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={segments.mediums.includes(medium)}
                        onChange={(e) => {
                          const newMediums = e.target.checked 
                            ? [...segments.mediums, medium]
                            : segments.mediums.filter(m => m !== medium);
                          onSegmentsChange({ ...segments, mediums: newMediums });
                        }}
                        className="rounded border-zinc-300 dark:border-zinc-600"
                      />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">{medium}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
