'use client';

import { Plus, Upload, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { IncomeKPIs } from '@/lib/incomeTypes';

interface IncomeHeaderProps {
  kpis: IncomeKPIs;
  onAddIncome: () => void;
  onExport: () => void;
  onImport: () => void;
}

export default function IncomeHeader({ kpis, onAddIncome, onExport, onImport }: IncomeHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Income
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Track your revenue streams and monitor progress towards your goals
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onImport}>
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button onClick={onAddIncome}>
            <Plus className="h-4 w-4 mr-2" />
            Add Income
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">MTD</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(kpis.mtd)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Last 30 Days</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(kpis.last30Days)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">All-Time</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(kpis.allTime)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Avg Daily</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(kpis.avgDaily)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Run-Rate</div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatCurrency(kpis.runRate)}
            </div>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Goal Progress</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(kpis.goalProgress.current)}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  of {formatCurrency(kpis.goalProgress.target)}
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, kpis.goalProgress.percentage)}%` }}
                />
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400 text-center">
                {kpis.goalProgress.percentage.toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}