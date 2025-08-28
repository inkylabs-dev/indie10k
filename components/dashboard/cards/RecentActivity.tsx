"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle2, DollarSign, Target, Users } from "lucide-react"

interface ActivityItem {
  id: string
  type: "mission" | "income" | "milestone" | "social"
  title: string
  description: string
  timestamp: string
  amount?: number
}

interface RecentActivityProps {
  activity: ActivityItem[]
  nowISO?: string
}

export function RecentActivity({ activity, nowISO }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "mission":
        return <Target className="h-4 w-4 text-blue-600" />
      case "income":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "milestone":
        return <CheckCircle2 className="h-4 w-4 text-purple-600" />
      case "social":
        return <Users className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mission":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "income":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "milestone":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "social":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = nowISO ? new Date(nowISO) : new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Activity className="h-5 w-5 text-gray-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your latest achievements and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex-shrink-0 mt-0.5">{getIcon(item.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <Badge className={getTypeColor(item.type)} variant="secondary">
                    {item.type}
                  </Badge>
                  {item.amount && <span className="text-green-600 font-medium text-sm">+${item.amount}</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                <span className="text-xs text-muted-foreground">{formatTime(item.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
