"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock, Target } from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  estimatedTime: string
  completed: boolean
  category: string
}

interface TodayMissionProps {
  mission: Mission
  onComplete: (missionId: string, completed: boolean) => void
}

export function TodayMission({ mission, onComplete }: TodayMissionProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleComplete = async () => {
    setIsCompleting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    onComplete(mission.id, !mission.completed)
    setIsCompleting(false)
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Today's Mission
          </CardTitle>
          <Badge className={difficultyColors[mission.difficulty]}>{mission.difficulty}</Badge>
        </div>
        <CardDescription>Complete today's challenge to build momentum</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-base mb-2">{mission.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {mission.estimatedTime}
            </div>
            <Badge variant="outline">{mission.category}</Badge>
          </div>
        </div>

        <Button
          onClick={handleComplete}
          disabled={isCompleting}
          className={`w-full ${mission.completed ? "bg-green-600 hover:bg-green-700" : ""}`}
          variant={mission.completed ? "default" : "default"}
        >
          {isCompleting ? (
            "Processing..."
          ) : mission.completed ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Completed!
            </>
          ) : (
            <>
              <Circle className="h-4 w-4 mr-2" />
              Mark Complete
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
