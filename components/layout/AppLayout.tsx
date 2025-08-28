"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Sidebar } from "@/components/dashboard/Sidebar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-6 md:ml-0">
          {children}
        </main>
      </div>
    </div>
  )
}