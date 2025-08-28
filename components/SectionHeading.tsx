interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">{title}</h2>
      {subtitle && <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">{subtitle}</p>}
    </div>
  )
}
