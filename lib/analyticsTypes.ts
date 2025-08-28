export interface KPI {
  visitors: number;
  signups: number;
  conversionRate: number; // 0..1
  activeUsers: number;
  revenue: number;
  goalThisMonth: number; // e.g., 1000
  goalMonthToDate: number;
}

export interface TimePoint {
  date: string; // ISO
  visitors: number;
  sessions: number;
  pageviews: number;
  signups: number;
  revenue: number;
}

export interface AttributionRow {
  source: string;
  medium: string;
  campaign?: string;
  visitors: number;
  signups: number;
  revenue: number;
}

export interface PageRow {
  path: string;
  pageviews: number;
  visitors: number;
  avgTimeOnPageSec: number;
  entrances: number;
  bounceRate: number; // 0..1
}

export interface FunnelStep {
  name: string;
  count: number;
}

export interface CohortCell {
  cohortWeekISO: string;   // e.g., 2025-W32
  weekIndex: number;       // 0..11
  activePct: number;       // 0..1
}

export interface SEOQueryRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;        // 0..1
  avgPosition: number;
}

export interface Segments {
  devices: ('Desktop'|'Mobile')[];
  countries: string[];          // ISO country names
  sources: string[];            // utm_source
  mediums: string[];            // utm_medium
}

export interface DateRange {
  from: Date;
  to: Date;
  preset?: '7D' | '30D' | '90D' | 'MTD' | 'YTD' | 'Custom';
}

export interface CompareData<T> {
  current: T;
  previous?: T;
}