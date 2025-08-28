"use client"

// Import global styles since this file is not wrapped by the root layout
import "./globals.css"
import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const isProd = process.env.NODE_ENV === "production"

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl w-full rounded-xl border bg-card p-8 shadow-sm">
            <div className="mb-4 text-2xl font-semibold">A critical error occurred</div>
            <p className="text-muted-foreground">
              The app encountered an unrecoverable error. You can try to reload the app or go back home.
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
                Reload app
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
      </body>
    </html>
  )
}

