import type { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  asChild = false,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  const sizeClasses = {
    sm: "h-9 px-3",
    md: "h-10 px-4 py-2",
    lg: "h-11 px-8",
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (asChild && typeof children === "object" && children !== null && "props" in children) {
    return children
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
