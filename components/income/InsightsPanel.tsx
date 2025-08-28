'use client';

import { TrendingUp, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IncomeEntry } from '@/lib/incomeTypes';
import { startOfMonth, endOfMonth } from '@/lib/date';

interface InsightsPanelProps {
  entries: IncomeEntry[];
  goalTarget?: number;
}

export default function InsightsPanel({ entries, goalTarget = 1000 }: InsightsPanelProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculate current month data
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const currentMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= monthStart && entryDate <= monthEnd;
  });

  const mtd = currentMonthEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const progressPercentage = goalTarget > 0 ? Math.min(100, (mtd / goalTarget) * 100) : 0;

  // Find best source
  const sourceTotal: Record<string, number> = {};
  currentMonthEntries.forEach(entry => {
    sourceTotal[entry.source] = (sourceTotal[entry.source] || 0) + entry.amount;
  });
  
  const bestSource = Object.entries(sourceTotal)
    .sort(([,a], [,b]) => b - a)
    .filter(([,amount]) => amount > 0)[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Goal Progress */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Monthly Goal</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-700 dark:text-zinc-300">
                  {formatCurrency(mtd)}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  of {formatCurrency(goalTarget)}
                </span>
              </div>
              
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    progressPercentage >= 100 
                      ? 'bg-green-500 dark:bg-green-400' 
                      : 'bg-blue-500 dark:bg-blue-400'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                {progressPercentage.toFixed(1)}% of goal
              </div>
            </div>
          </div>

          {/* Best Source */}
          {bestSource && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">Top Source</h4>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="font-semibold text-green-800 dark:text-green-200">
                  {bestSource[0]}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  {formatCurrency(bestSource[1])} this month
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="text-center">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                {currentMonthEntries.length}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                This Month
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                {entries.length}
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">
                All Time
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}