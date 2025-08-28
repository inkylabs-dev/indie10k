"use client"

import { useState } from "react"
import { DashboardHeader } from "./DashboardHeader"
import { Sidebar } from "./Sidebar"
import { MainContent } from "./MainContent"
import { mockData } from "@/lib/mock-data"

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState(mockData)

  const updateMissionComplete = (missionId: string, completed: boolean) => {
    setData((prev) => ({
      ...prev,
      todayMission: {
        ...prev.todayMission,
        completed,
      },
      activity: completed
        ? [
            {
              id: `a-${Date.now()}`,
              time: new Date().toISOString(),
              type: "mission",
              text: `Marked '${prev.todayMission.title}' complete.`,
            },
            ...prev.activity,
          ]
        : prev.activity,
    }))
  }

  const addIncome = (entry: { amount: number; source: string; note: string }) => {
    const newEntry = {
      id: `i-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      ...entry,
    }

    setData((prev) => ({
      ...prev,
      income: {
        ...prev.income,
        today: prev.income.today + entry.amount,
        week: prev.income.week + entry.amount,
        total: prev.income.total + entry.amount, // Updated to use 'total' field
        thisMonth: prev.income.thisMonth + entry.amount, // Updated to use 'thisMonth' field
        allTime: prev.income.allTime + entry.amount,
        entries: [newEntry, ...prev.income.entries.slice(0, 4)],
      },
      user: {
        ...prev.user,
        currentRevenue: prev.user.currentRevenue + entry.amount, // Updated to use 'currentRevenue' field
      },
      activity: [
        {
          id: `a-${Date.now()}`,
          time: new Date().toISOString(),
          type: "income",
          text: `Added income $${entry.amount.toFixed(2)} (${entry.source}).`,
        },
        ...prev.activity,
      ],
    }))
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <MainContent data={data} onMissionComplete={updateMissionComplete} onAddIncome={addIncome} />
      </div>
    </div>
  )
}
