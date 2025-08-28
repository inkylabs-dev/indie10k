import type { ReactNode } from "react"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: "Blog — Indie10k",
  description: "Articles and updates from Indie10k: product thinking, growth, and building to $10k and beyond.",
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">{children}</main>
      <Footer />
    </div>
  )
}

