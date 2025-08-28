'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Copy } from 'lucide-react';
import type { IncomeEntry, SortField, SortDirection } from '@/lib/incomeTypes';
import { formatDate } from '@/lib/date';

interface IncomeTableProps {
  entries: IncomeEntry[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onEdit: (entry: IncomeEntry) => void;
  onDelete: (id: string) => void;
  onDuplicate: (entry: IncomeEntry) => void;
  onGenerateRecurring: (entry: IncomeEntry) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export default function IncomeTable({
  entries,
  onEdit,
  onDelete,
  onDuplicate,
}: IncomeTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getCategoryVariant = (category: string) => {
    const variants: Record<string, any> = {
      Product: 'default',
      Ads: 'secondary',
      Services: 'outline',
      Donations: 'destructive',
      Other: 'default'
    };
    return variants[category] || 'default';
  };

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
                💰
              </div>
            </div>
            <h3 className="text-lg font-medium mb-2">No Income Entries</h3>
            <p className="text-sm">Start tracking your income by adding your first entry.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.slice(0, 10).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(entry.amount)}
                  </div>
                  <Badge variant={getCategoryVariant(entry.category)}>
                    {entry.category}
                  </Badge>
                  <Badge variant="outline">
                    {entry.source}
                  </Badge>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {formatDate(entry.date)} {entry.note && `• ${entry.note}`}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => onEdit(entry)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDuplicate(entry)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(entry.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {entries.length > 10 && (
            <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-4">
              Showing 10 of {entries.length} entries. Full table coming soon...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}