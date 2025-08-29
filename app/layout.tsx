import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Indie10k Dashboard - Track Your Journey to $10k",
  description: "Dashboard for indie developers to track missions, income, and progress toward making $10k online.",
  keywords: ["indie hacker", "online income", "developer", "startup", "side hustle", "passive income"],
  authors: [{ name: "Indie10k" }],
  creator: "Indie10k",
  publisher: "Indie10k",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://indie10k.com",
    title: "Indie10k Dashboard - Track Your Journey to $10k",
    description: "Dashboard for indie developers to track missions, income, and progress toward making $10k online.",
    siteName: "Indie10k",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Indie10k - Make your first $1000 online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indie10k Dashboard - Track Your Journey to $10k",
    description: "Dashboard for indie developers to track missions, income, and progress toward making $10k online.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* TODO: Add Plausible Analytics */}
        {/* <script defer data-domain="indie10k.com" src="https://plausible.io/js/script.js"></script> */}
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
