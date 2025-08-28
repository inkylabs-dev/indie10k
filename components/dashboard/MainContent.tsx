"use client"

import { TodayMission } from "./cards/TodayMission"
import { GoalProgress } from "./cards/GoalProgress"
import { IncomeTracker } from "./cards/IncomeTracker"
import { TaskStreakHeatmap } from "./cards/TaskStreakHeatmap"
import { RevenueChart } from "./cards/RevenueChart"
import { RecentActivity } from "./cards/RecentActivity"

interface MainContentProps {
  data: any
  onMissionComplete: (missionId: string, completed: boolean) => void
  onAddIncome: (entry: { amount: number; source: string; note: string }) => void
}

export function MainContent({ data, onMissionComplete, onAddIncome }: MainContentProps) {
  return (
    <main className="flex-1 p-6 md:ml-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6">
          <TodayMission mission={data.todayMission} onComplete={onMissionComplete} />
        </div>

        <div className="md:col-span-3">
          <GoalProgress user={data.user} />
        </div>

        <div className="md:col-span-3">
          <IncomeTracker income={data.income} onAddIncome={onAddIncome} />
        </div>

        <div className="md:col-span-6">
          <TaskStreakHeatmap streaks={data.streaks} />
        </div>

        <div className="md:col-span-6">
          <RevenueChart revenueSeries={data.revenueSeries} />
        </div>

        <div className="md:col-span-12">
          <RecentActivity activity={data.activity} />
        </div>
      </div>
    </main>
  )
}
