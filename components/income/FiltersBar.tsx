'use client';

import { Card, CardContent } from "@/components/ui/card";
import type { IncomeFilters } from '@/lib/incomeTypes';

interface FiltersBarProps {
  filters: IncomeFilters;
  onFiltersChange: (filters: IncomeFilters) => void;
}

export default function FiltersBar({ filters, onFiltersChange }: FiltersBarProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-center text-zinc-600 dark:text-zinc-400">
          <p>Filters coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );
}