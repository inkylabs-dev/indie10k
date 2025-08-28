"use client";

import { useState, useEffect, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { TimeSeries } from '@/components/analytics/TimeSeries';
import { Attribution } from '@/components/analytics/Attribution';
import { TopPages } from '@/components/analytics/TopPages';
import { Funnel } from '@/components/analytics/Funnel';
import { Cohorts } from '@/components/analytics/Cohorts';
import { SEOQueries } from '@/components/analytics/SEOQueries';
import { InsightsPanel } from '@/components/analytics/InsightsPanel';
import { useToast } from '@/components/analytics/Toast';

import type { DateRange, Segments, CompareData, KPI, TimePoint, PageRow } from '@/lib/analyticsTypes';
import { getDatePresets, subtractDays, getDaysInRange } from '@/lib/date';
import { useLocalStorage } from '@/lib/useLocalStorage';
import {
  generateKPI,
  generateTimeSeries,
  generateAttribution,
  generateTopPages,
  generateFunnel,
  generateCohorts,
  generateSEOQueries
} from '@/lib/sampleAnalytics';

export default function AnalyticsPage() {
  const { addToast, ToastContainer } = useToast();

  // State for date range and segments
  const [dateRange, setDateRange] = useLocalStorage<DateRange>('analytics-date-range', {
    from: subtractDays(new Date(), 29),
    to: new Date(),
    preset: '30D'
  });

  const [segments, setSegments] = useLocalStorage<Segments>('analytics-segments', {
    devices: ['Desktop', 'Mobile'],
    countries: [],
    sources: [],
    mediums: []
  });

  const [compareEnabled, setCompareEnabled] = useLocalStorage<boolean>('analytics-compare', false);
  const [topPagesData, setTopPagesData] = useState(generateTopPages());

  // Normalize persisted dates from localStorage (strings -> Date)
  useEffect(() => {
    const fromIsDate = dateRange.from instanceof Date;
    const toIsDate = dateRange.to instanceof Date;
    if (!fromIsDate || !toIsDate) {
      setDateRange({
        ...dateRange,
        from: new Date(dateRange.from as any),
        to: new Date(dateRange.to as any)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sample data - in a real app this would come from APIs
  const rawData = useMemo(() => ({
    kpi: generateKPI(),
    timeSeries: generateTimeSeries(),
    attribution: generateAttribution(),
    funnel: generateFunnel(),
    cohorts: generateCohorts(),
    seoQueries: generateSEOQueries()
  }), []);

  // Generate comparison data if compare mode is enabled
  const compareData = useMemo(() => {
    if (!compareEnabled) return null;

    const rangeDays = getDaysInRange(dateRange.from, dateRange.to).length;
    const compareFrom = subtractDays(dateRange.from, rangeDays);
    const compareTo = subtractDays(dateRange.to, rangeDays);

    // In a real app, you'd fetch data for the comparison period
    // For now, we'll generate slightly different data
    return {
      kpi: {
        ...rawData.kpi,
        visitors: Math.floor(rawData.kpi.visitors * 0.9),
        signups: Math.floor(rawData.kpi.signups * 0.85),
        revenue: Math.floor(rawData.kpi.revenue * 0.8),
        conversionRate: rawData.kpi.conversionRate * 0.9
      },
      timeSeries: rawData.timeSeries.map(point => ({
        ...point,
        visitors: Math.floor(point.visitors * 0.9),
        signups: Math.floor(point.signups * 0.85),
        revenue: Math.floor(point.revenue * 0.8)
      })),
      funnel: rawData.funnel.map(step => ({
        ...step,
        count: Math.floor(step.count * 0.9)
      }))
    };
  }, [compareEnabled, dateRange, rawData]);

  // Wrap data in CompareData format
  const kpiData: CompareData<KPI> = {
    current: rawData.kpi,
    previous: compareData?.kpi
  };

  const timeSeriesData: CompareData<TimePoint[]> = {
    current: rawData.timeSeries,
    previous: compareData?.timeSeries
  };

  const funnelData = rawData.funnel;
  const funnelCompareData = compareData?.funnel;

  // Event handlers
  const handleDateRangeChange = (newRange: DateRange) => {
    setDateRange(newRange);
    addToast(`Date range updated to ${newRange.preset || 'Custom'}`, 'info');
  };

  const handleSegmentsChange = (newSegments: Segments) => {
    setSegments(newSegments);
    const totalSegments = [
      ...newSegments.devices,
      ...newSegments.countries,
      ...newSegments.sources,
      ...newSegments.mediums
    ].length;
    addToast(`Segments updated (${totalSegments} filters applied)`, 'info');
  };

  const handleCompareToggle = (enabled: boolean) => {
    setCompareEnabled(enabled);
    addToast(`Compare mode ${enabled ? 'enabled' : 'disabled'}`, 'info');
  };

  const handleTopPagesUpdate = (newData: PageRow[]) => {
    setTopPagesData(newData);
    addToast(`Top pages data updated (${newData.length} pages)`, 'success');
  };

  const handleExport = (type: string) => {
    addToast(`${type} data exported successfully`, 'success');
  };

  const handleImport = () => {
    addToast('CSV data imported successfully', 'success');
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header with KPIs and Controls */}
        <AnalyticsHeader
          kpi={kpiData}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          segments={segments}
          onSegmentsChange={handleSegmentsChange}
          compareEnabled={compareEnabled}
          onCompareToggle={handleCompareToggle}
        />

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Main Charts */}
          <div className="xl:col-span-3 space-y-8">
            {/* Time Series Chart */}
            <TimeSeries data={timeSeriesData} />

            {/* Attribution and Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Attribution 
                data={rawData.attribution} 
                onExport={() => handleExport('Attribution')}
              />
              <TopPages 
                data={topPagesData}
                onDataUpdate={handleTopPagesUpdate}
                onExport={() => handleExport('Top Pages')}
                onImport={handleImport}
              />
            </div>

            {/* Funnel and Cohorts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Funnel 
                data={funnelData}
                compareData={funnelCompareData}
              />
              <Cohorts 
                data={rawData.cohorts}
                onExport={() => handleExport('Cohorts')}
              />
            </div>

            {/* SEO Queries */}
            <SEOQueries 
              data={rawData.seoQueries}
              onExport={() => handleExport('SEO Queries')}
            />
          </div>

          {/* Right Column - Insights Panel */}
          <div className="xl:col-span-1">
            <div className="sticky top-6">
              <InsightsPanel
                kpi={rawData.kpi}
                attribution={rawData.attribution}
                pages={topPagesData}
                seoQueries={rawData.seoQueries}
                timeSeries={rawData.timeSeries}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </AppLayout>
  );
}
