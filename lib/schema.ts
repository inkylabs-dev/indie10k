import { pgTable, text, timestamp, json, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const waitlist = pgTable('waitlist', {
  email: text('email').primaryKey(),
  name: text('name'),
  source: text('source'),
  utm: json('utm'),
  referrer: text('referrer'),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`now()`).notNull(),
  confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
  confirmToken: text('confirm_token'),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  confirmTokenIdx: index('confirm_token_idx').on(table.confirmToken),
}));

export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}