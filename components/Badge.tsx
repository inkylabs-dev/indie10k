import type { ReactNode } from "react"

interface BadgeProps {
  children: ReactNode
  className?: string
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground ${className}`}
    >
      {children}
    </span>
  )
}
