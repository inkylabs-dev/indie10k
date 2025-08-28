"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    // eslint-disable-next-line no-console
    console.error("App error boundary:", error)
  }, [error])

  const isProd = process.env.NODE_ENV === "production"

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full rounded-xl border bg-card p-8 shadow-sm">
        <div className="mb-4 text-2xl font-semibold">Something went wrong</div>
        <p className="text-muted-foreground">
          An unexpected error occurred. You can try again or go back to the homepage.
        </p>

        {!isProd && (
          <div className="mt-6 rounded-md bg-muted p-4 text-sm">
            <div className="font-mono whitespace-pre-wrap break-words">
              {error?.message || "Unknown error"}
            </div>
            {error?.stack && (
              <details className="mt-3">
                <summary className="cursor-pointer select-none">Stack trace</summary>
                <pre className="mt-2 overflow-auto text-xs leading-relaxed">{error.stack}</pre>
              </details>
            )}
            {error?.digest && (
              <div className="mt-2 text-xs text-muted-foreground">Digest: {error.digest}</div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

