"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Flame } from "lucide-react"

interface StreakData {
  date: string
  completed: boolean
  count: number
}

interface TaskStreakHeatmapProps {
  streaks: StreakData[]
}

export function TaskStreakHeatmap({ streaks }: TaskStreakHeatmapProps) {
  const currentStreak = streaks.filter((s) => s.completed).length
  const maxStreak = Math.max(...streaks.map((s) => s.count))

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800"
    if (count <= 2) return "bg-green-200 dark:bg-green-900"
    if (count <= 4) return "bg-green-400 dark:bg-green-700"
    return "bg-green-600 dark:bg-green-500"
  }

  // Generate last 30 days for heatmap
  const generateHeatmapData = () => {
    const data = []
    const today = new Date()

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const streak = streaks.find((s) => s.date === dateStr)
      data.push({
        date: dateStr,
        count: streak?.count || 0,
        completed: streak?.completed || false,
      })
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-orange-600" />
          Task Streak
        </CardTitle>
        <CardDescription>Your daily consistency over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold flex items-center gap-1">
              <Flame className="h-6 w-6 text-orange-500" />
              {currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{maxStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Activity Heatmap</div>
          <div className="grid grid-cols-10 gap-1">
            {heatmapData.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${getIntensity(day.count)}`}
                title={`${day.date}: ${day.count} tasks completed`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-sm bg-gray-100 dark:bg-gray-800" />
              <div className="w-2 h-2 rounded-sm bg-green-200 dark:bg-green-900" />
              <div className="w-2 h-2 rounded-sm bg-green-400 dark:bg-green-700" />
              <div className="w-2 h-2 rounded-sm bg-green-600 dark:bg-green-500" />
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
