'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IncomeEntry } from '@/lib/incomeTypes';

interface IncomeChartsProps {
  entries: IncomeEntry[];
  dateRange?: { from: string; to: string };
}

export default function IncomeCharts({ entries }: IncomeChartsProps) {
  const total = entries.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            ${total.toFixed(2)}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Total from {entries.length} entries
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Charts coming soon...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}