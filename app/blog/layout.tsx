import type { ReactNode } from "react"
import type { Metadata } from "next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import JoinWaitlist from "@/components/JoinWaitlist"
import Container from "@/components/Container"

export const metadata: Metadata = {
  title: "Blog — Indie10k",
  description: "Articles and updates from Indie10k: product thinking, growth, and building to $10k and beyond.",
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">{children}</main>
      <section className="py-12 bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start your indie journey?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of developers building their path to $10k</p>
            <JoinWaitlist />
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  )
}

