import type { KPI, TimePoint, AttributionRow, PageRow, FunnelStep, CohortCell, SEOQueryRow } from './analyticsTypes';
import { subtractDays, addDays, getWeekISO } from './date';

export function generateKPI(): KPI {
  return {
    visitors: 3427,
    signups: 171,
    conversionRate: 0.0499,
    activeUsers: 118,
    revenue: 123,
    goalThisMonth: 1000,
    goalMonthToDate: 123
  };
}

export function generateTimeSeries(): TimePoint[] {
  const data: TimePoint[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = subtractDays(today, i);
    const baseVisitors = 30 + Math.random() * 40;
    const visitors = Math.floor(baseVisitors * (1 + 0.3 * Math.sin(i * 0.1)));
    const sessions = Math.floor(visitors * (0.7 + Math.random() * 0.2));
    const pageviews = Math.floor(sessions * (2 + Math.random() * 1.5));
    const signups = Math.floor(visitors * (0.03 + Math.random() * 0.04));
    const revenue = Math.floor(signups * (0.5 + Math.random() * 2));
    
    data.push({
      date: date.toISOString().split('T')[0],
      visitors,
      sessions,
      pageviews,
      signups,
      revenue
    });
  }
  
  return data;
}

export function generateAttribution(): AttributionRow[] {
  return [
    { source: 'google', medium: 'organic', visitors: 1247, signups: 67, revenue: 45 },
    { source: 'twitter', medium: 'social', visitors: 523, signups: 31, revenue: 18 },
    { source: 'reddit', medium: 'social', visitors: 412, signups: 19, revenue: 12 },
    { source: 'newsletter', medium: 'email', visitors: 298, signups: 21, revenue: 19 },
    { source: 'direct', medium: 'none', visitors: 267, signups: 8, revenue: 5 },
    { source: 'indiehackers', medium: 'referral', visitors: 189, signups: 12, revenue: 8 },
    { source: 'producthunt', medium: 'referral', visitors: 156, signups: 7, revenue: 4 },
    { source: 'youtube', medium: 'social', visitors: 134, signups: 4, revenue: 3 },
    { source: 'github', medium: 'referral', visitors: 98, signups: 2, revenue: 9 },
    { source: 'google', medium: 'cpc', campaign: 'indie-tools', visitors: 76, signups: 0, revenue: 0 },
    { source: 'hackernews', medium: 'social', visitors: 67, signups: 0, revenue: 0 },
    { source: 'linkedin', medium: 'social', visitors: 43, signups: 0, revenue: 0 }
  ];
}

export function generateTopPages(): PageRow[] {
  return [
    { path: '/', pageviews: 2847, visitors: 1923, avgTimeOnPageSec: 142, entrances: 1654, bounceRate: 0.34 },
    { path: '/blog/first-1000', pageviews: 1234, visitors: 987, avgTimeOnPageSec: 284, entrances: 723, bounceRate: 0.21 },
    { path: '/post/tools-for-indie-devs', pageviews: 876, visitors: 698, avgTimeOnPageSec: 198, entrances: 456, bounceRate: 0.45 },
    { path: '/pricing', pageviews: 654, visitors: 534, avgTimeOnPageSec: 97, entrances: 234, bounceRate: 0.67 },
    { path: '/about', pageviews: 543, visitors: 432, avgTimeOnPageSec: 156, entrances: 198, bounceRate: 0.52 },
    { path: '/blog/seo-for-indie-hackers', pageviews: 432, visitors: 367, avgTimeOnPageSec: 276, entrances: 289, bounceRate: 0.31 },
    { path: '/dashboard', pageviews: 387, visitors: 123, avgTimeOnPageSec: 543, entrances: 67, bounceRate: 0.18 },
    { path: '/signup', pageviews: 298, visitors: 287, avgTimeOnPageSec: 89, entrances: 234, bounceRate: 0.78 },
    { path: '/blog', pageviews: 267, visitors: 234, avgTimeOnPageSec: 134, entrances: 156, bounceRate: 0.43 },
    { path: '/features', pageviews: 234, visitors: 198, avgTimeOnPageSec: 167, entrances: 123, bounceRate: 0.56 },
    { path: '/post/marketing-channels', pageviews: 198, visitors: 167, avgTimeOnPageSec: 234, entrances: 98, bounceRate: 0.38 },
    { path: '/contact', pageviews: 156, visitors: 134, avgTimeOnPageSec: 87, entrances: 87, bounceRate: 0.71 },
    { path: '/privacy', pageviews: 123, visitors: 98, avgTimeOnPageSec: 65, entrances: 76, bounceRate: 0.82 },
    { path: '/terms', pageviews: 98, visitors: 87, avgTimeOnPageSec: 54, entrances: 65, bounceRate: 0.87 },
    { path: '/404', pageviews: 67, visitors: 54, avgTimeOnPageSec: 12, entrances: 54, bounceRate: 0.95 }
  ];
}

export function generateFunnel(): FunnelStep[] {
  return [
    { name: 'Visit', count: 5000 },
    { name: 'View Blog Post', count: 2200 },
    { name: 'CTA Click', count: 500 },
    { name: 'Signup', count: 170 },
    { name: 'First Income', count: 12 }
  ];
}

export function generateCohorts(): CohortCell[] {
  const cohorts: CohortCell[] = [];
  const today = new Date();
  
  for (let cohortWeek = 0; cohortWeek < 12; cohortWeek++) {
    const cohortDate = subtractDays(today, (cohortWeek + 1) * 7);
    const cohortWeekISO = getWeekISO(cohortDate);
    
    for (let weekIndex = 0; weekIndex < 12 - cohortWeek; weekIndex++) {
      const basePct = 0.35;
      const decayRate = 0.8;
      const noise = (Math.random() - 0.5) * 0.1;
      const activePct = Math.max(0.01, Math.min(0.5, basePct * Math.pow(decayRate, weekIndex) + noise));
      
      cohorts.push({
        cohortWeekISO,
        weekIndex,
        activePct
      });
    }
  }
  
  return cohorts;
}

export function generateSEOQueries(): SEOQueryRow[] {
  const queries = [
    { query: 'indie hacker tools', impressions: 1843, position: 8.2 },
    { query: 'how to make money online', impressions: 1654, position: 12.1 },
    { query: 'side hustle ideas', impressions: 1234, position: 15.3 },
    { query: 'passive income streams', impressions: 987, position: 6.7 },
    { query: 'startup idea validation', impressions: 876, position: 9.4 },
    { query: 'indie10k review', impressions: 723, position: 3.1 },
    { query: 'online business tools', impressions: 654, position: 11.8 },
    { query: 'make first 1000 dollars', impressions: 543, position: 14.2 },
    { query: 'digital nomad income', impressions: 432, position: 18.7 },
    { query: 'indie hacker community', impressions: 387, position: 7.9 },
    { query: 'bootstrap startup', impressions: 321, position: 13.4 },
    { query: 'solopreneur tips', impressions: 298, position: 16.8 },
    { query: 'online course creation', impressions: 267, position: 10.3 },
    { query: 'SaaS idea validation', impressions: 234, position: 5.6 },
    { query: 'content marketing for startups', impressions: 198, position: 19.2 },
    { query: 'indie10k dashboard', impressions: 167, position: 2.1 },
    { query: 'revenue tracking tools', impressions: 134, position: 8.7 },
    { query: 'goal tracking app', impressions: 123, position: 11.5 },
    { query: 'indie hacker success stories', impressions: 98, position: 17.3 },
    { query: 'online income tracker', impressions: 87, position: 4.2 }
  ];
  
  return queries.map(q => {
    const ctr = Math.min(0.12, Math.max(0.005, 0.15 * Math.exp(-q.position / 8) + (Math.random() - 0.5) * 0.02));
    const clicks = Math.floor(q.impressions * ctr);
    
    return {
      query: q.query,
      clicks,
      impressions: q.impressions,
      ctr,
      avgPosition: q.position
    };
  });
}