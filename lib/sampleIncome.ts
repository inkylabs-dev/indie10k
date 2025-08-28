import type { IncomeEntry } from './incomeTypes';
import { addDays, formatDateISO } from './date';

const generateId = (index: number): string => `income-${Date.now()}-${index}`;

export const sampleIncome: IncomeEntry[] = [
  {
    id: generateId(1),
    date: formatDateISO(addDays(new Date(), -2)),
    source: 'Stripe',
    category: 'Product',
    amount: 97.50,
    note: 'Pro subscription - monthly'
  },
  {
    id: generateId(2),
    date: formatDateISO(addDays(new Date(), -5)),
    source: 'AdSense',
    category: 'Ads',
    amount: 12.34,
    note: 'Blog ad revenue'
  },
  {
    id: generateId(3),
    date: formatDateISO(addDays(new Date(), -7)),
    source: 'Gumroad',
    category: 'Product',
    amount: 29.99,
    note: 'Digital template sale'
  },
  {
    id: generateId(4),
    date: formatDateISO(addDays(new Date(), -10)),
    source: 'Affiliate',
    category: 'Services',
    amount: 45.67,
    note: 'Tool referral commission'
  },
  {
    id: generateId(5),
    date: formatDateISO(addDays(new Date(), -12)),
    source: 'Stripe',
    category: 'Services',
    amount: 150.00,
    note: 'Consulting session',
    recurring: {
      frequency: 'Monthly',
      nextDateISO: formatDateISO(addDays(new Date(), 18))
    }
  },
  {
    id: generateId(6),
    date: formatDateISO(addDays(new Date(), -15)),
    source: 'Other',
    category: 'Donations',
    amount: 5.00,
    note: 'Buy me a coffee'
  },
  {
    id: generateId(7),
    date: formatDateISO(addDays(new Date(), -18)),
    source: 'AdSense',
    category: 'Ads',
    amount: 8.92,
    note: 'YouTube ad revenue'
  },
  {
    id: generateId(8),
    date: formatDateISO(addDays(new Date(), -20)),
    source: 'Stripe',
    category: 'Product',
    amount: 49.99,
    note: 'Premium plan upgrade'
  },
  {
    id: generateId(9),
    date: formatDateISO(addDays(new Date(), -22)),
    source: 'Gumroad',
    category: 'Product',
    amount: 19.99,
    note: 'Course module sale'
  },
  {
    id: generateId(10),
    date: formatDateISO(addDays(new Date(), -25)),
    source: 'Affiliate',
    category: 'Services',
    amount: 73.25,
    note: 'Hosting referral'
  },
  {
    id: generateId(11),
    date: formatDateISO(addDays(new Date(), -28)),
    source: 'AdSense',
    category: 'Ads',
    amount: 15.67,
    note: 'Website display ads'
  },
  {
    id: generateId(12),
    date: formatDateISO(addDays(new Date(), -30)),
    source: 'Stripe',
    category: 'Product',
    amount: 120.00,
    note: 'Annual subscription'
  }
];