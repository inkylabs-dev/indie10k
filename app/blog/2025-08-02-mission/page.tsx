import type { Metadata } from "next"
import Container from "@/components/Container"

export const metadata: Metadata = {
  title: "Our Mission at Indie10k",
  description:
    "Indie10k is building a clear, achievable path for independent developers to reach financial freedom — from $0 to $10k and beyond.",
}

export default function MissionPost() {
  return (
    <Container>
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Our Mission at Indie10k</h1>
          <p className="mt-2 text-sm text-muted-foreground">Published August 28, 2024</p>
        </header>

        <div className="space-y-4 leading-7">
          <p>
            At Indie10k, we believe every independent developer deserves a clear, achievable path to financial freedom.
          </p>

          <p>
            Too many projects die not because of bad ideas, but because of a lack of structure, momentum, and the right
            tools. We’re here to change that.
          </p>

          <p>
            Today, Indie10k is a roadmap and tracker—helping you go from $0 to your first $1000 with daily tasks,
            revenue tracking, and growth insights.
          </p>

          <p>Tomorrow, Indie10k will be your automated co-pilot:</p>

          <ul className="list-disc pl-6">
            <li>A personal coach that adapts tasks to your goals.</li>
            <li>A dashboard that connects traffic, revenue, and progress.</li>
          </ul>

          <p>
            Our long-term vision is to turn Indie10k into the complete income-assistant for indie makers—from idea →
            execution → traffic → revenue → $10k and beyond.
          </p>

          <p>
            Because indie developers don’t just need another to-do app. They need a partner that helps them finish,
            launch, and win. 🚀
          </p>
        </div>
      </article>
    </Container>
  )
}
