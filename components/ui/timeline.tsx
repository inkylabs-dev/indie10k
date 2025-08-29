import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TimelineItem {
  title: string
  subtitle?: string
  description: string
  content?: React.ReactNode
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn("relative", className)}>
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />
        
        {/* Timeline items */}
        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary shadow-sm">
                <div className="h-3 w-3 rounded-full bg-primary-foreground" />
              </div>
              
              {/* Timeline card */}
              <div className="flex-1 pb-8">
                <Card className="shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      {item.subtitle && (
                        <CardDescription className="text-xs font-medium bg-muted px-2 py-1 rounded">
                          {item.subtitle}
                        </CardDescription>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  {item.content && (
                    <CardContent className="pt-0">
                      {item.content}
                    </CardContent>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

Timeline.displayName = "Timeline"

export { Timeline, type TimelineItem, type TimelineProps }