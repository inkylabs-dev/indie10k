export type IncomeSource = 'AdSense' | 'Stripe' | 'Gumroad' | 'Affiliate' | 'Other';
export type IncomeCategory = 'Product' | 'Ads' | 'Services' | 'Donations' | 'Other';

export interface IncomeEntry {
  id: string;
  date: string; // ISO
  source: IncomeSource;
  category: IncomeCategory;
  amount: number; // USD
  note?: string;
  recurring?: {
    frequency: 'Weekly' | 'Monthly';
    nextDateISO: string;
  };
}

export interface IncomeFilters {
  from?: string; // ISO
  to?: string;   // ISO
  sources: IncomeSource[];
  categories: IncomeCategory[];
  search: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface IncomeKPIs {
  mtd: number;
  last30Days: number;
  allTime: number;
  avgDaily: number;
  runRate: number;
  goalProgress: {
    current: number;
    target: number;
    percentage: number;
  };
}

export type SortField = 'date' | 'amount' | 'source' | 'category';
export type SortDirection = 'asc' | 'desc';