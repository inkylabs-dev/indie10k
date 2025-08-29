import { pgTable, text, timestamptz, json, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const waitlist = pgTable('waitlist', {
  email: text('email').primaryKey(),
  name: text('name'),
  source: text('source'),
  utm: json('utm'),
  referrer: text('referrer'),
  createdAt: timestamptz('created_at').defaultNow().notNull(),
  confirmedAt: timestamptz('confirmed_at'),
  confirmToken: text('confirm_token'),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  confirmTokenIdx: index('confirm_token_idx').on(table.confirmToken),
}));

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}