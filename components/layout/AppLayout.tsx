"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Sidebar } from "@/components/dashboard/Sidebar"

interface AppLayoutProps {
  children: React.ReactNode
  showMask?: boolean
}

export function AppLayout({ children, showMask }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showOverlay = typeof showMask === 'boolean' ? showMask : false;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 relative">
      <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="relative flex-1">
          <main className="p-6 md:ml-0 relative">
            {children}
            {showOverlay && (
              <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}