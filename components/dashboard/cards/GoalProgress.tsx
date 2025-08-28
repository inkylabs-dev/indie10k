"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign } from "lucide-react"

interface User {
  name: string
  current: number
  goal: number
  articlesWritten?: number
  missionsCompleted?: number
  ctrAvg?: number
}

interface GoalProgressProps {
  user: User
}

export function GoalProgress({ user }: GoalProgressProps) {
  const currentRevenue = user?.current || 0
  const goal = user?.goal || 10000
  const progressPercentage = Math.min((currentRevenue / goal) * 100, 100)
  const remaining = Math.max(goal - currentRevenue, 0)

  const monthlyGrowth = user?.ctrAvg ? (user.ctrAvg * 100).toFixed(1) : "12.5"

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Goal Progress
        </CardTitle>
        <CardDescription>Track your journey to $10k</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold">${currentRevenue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">of ${goal.toLocaleString()} goal</div>
        </div>

        <Progress value={progressPercentage} className="h-3" />

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{progressPercentage.toFixed(1)}% complete</span>
          <span className="text-muted-foreground">${remaining.toLocaleString()} to go</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="text-green-600 font-medium">+{monthlyGrowth}% this month</span>
        </div>
      </CardContent>
    </Card>
  )
}
