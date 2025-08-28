"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

interface RevenueDataPoint {
  month: string
  revenue: number
  growth: number
}

interface RevenueChartProps {
  revenueSeries: RevenueDataPoint[]
}

export function RevenueChart({ revenueSeries }: RevenueChartProps) {
  const maxRevenue = Math.max(...revenueSeries.map((d) => d.revenue))
  const totalGrowth = revenueSeries[revenueSeries.length - 1]?.growth || 0

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          Revenue Chart
        </CardTitle>
        <CardDescription>Monthly revenue progression</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold">${maxRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Peak Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold flex items-center gap-1">
              <TrendingUp className="h-5 w-5 text-green-500" />
              {totalGrowth > 0 ? "+" : ""}
              {totalGrowth}%
            </div>
            <div className="text-sm text-muted-foreground">Growth</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Last 6 Months</div>
          <div className="space-y-2">
            {revenueSeries.map((data, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-muted-foreground">{data.month}</div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(data.revenue / maxRevenue) * 100}%`,
                    }}
                  />
                </div>
                <div className="w-16 text-sm font-medium text-right">${data.revenue.toLocaleString()}</div>
                <div
                  className={`w-12 text-xs text-right ${
                    data.growth > 0 ? "text-green-600" : data.growth < 0 ? "text-red-600" : "text-gray-500"
                  }`}
                >
                  {data.growth > 0 ? "+" : ""}
                  {data.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
