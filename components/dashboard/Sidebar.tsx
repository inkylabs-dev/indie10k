"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BarChart3, Target, DollarSign, Settings, X, Zap } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: "Dashboard", icon: BarChart3, href: "/" },
  { name: "Missions", icon: Target, href: "/missions" },
  { name: "Income", icon: DollarSign, href: "/income" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose() // Close mobile sidebar after navigation
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-64 transform bg-white border-r transition-transform duration-200 ease-in-out dark:bg-zinc-900 md:relative md:top-0 md:h-[calc(100vh-3.5rem)] md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="font-semibold">Menu</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button 
                  key={item.name} 
                  variant={isActive ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Button>
              )
            })}
          </nav>

          <div className="p-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Zap className="mr-2 h-4 w-4" />
              Start 30-Day Challenge
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
