import type { Metadata } from "next"
import Container from "@/components/Container"
import { Timeline, type TimelineItem } from "@/components/ui/timeline"

export const metadata: Metadata = {
  title: "Website Monetization Roadmap: From First Dollar to Sustainable Growth",
  description:
    "A structured roadmap for building profitable websites, covering traffic acquisition, monetization models, user retention, and scaling from $0 to $1000+ per month.",
}

const timelineItems: TimelineItem[] = [
  {
    title: "Phase 1: Getting Started",
    subtitle: "0 → First Dollar | 1-4 weeks",
    description: "Validate your idea, attract initial visitors, and earn your first revenue.",
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-2">Key Tasks:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Identify a niche with clear user intent and monetization potential</li>
            <li>Create a minimum viable website with core content or tools</li>
            <li>Drive initial traffic using SEO, social media, or communities</li>
            <li>Implement simple monetization methods like ads, affiliate links, or paid tools</li>
            <li>Track basic analytics to understand visitor behavior</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-200 p-3 rounded">
          <p className="text-sm font-medium text-amber-800">Pitfalls to Avoid</p>
          <p className="text-sm text-amber-700">Avoid overbuilding before validating demand; don't rely solely on one traffic source.</p>
        </div>
      </div>
    )
  },
  {
    title: "Phase 2: Expansion",
    subtitle: "$1 → $100/month | 1-3 months",
    description: "Increase traffic and diversify monetization channels.",
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-2">Key Tasks:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Expand content or features to cover related keywords and user needs</li>
            <li>Optimize SEO and improve site performance</li>
            <li>Experiment with additional monetization options such as email lists, sponsored content, or premium features</li>
            <li>Engage with your audience to build loyalty and gather feedback</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-200 p-3 rounded">
          <p className="text-sm font-medium text-amber-800">Pitfalls to Avoid</p>
          <p className="text-sm text-amber-700">Don't spread yourself too thin; focus on channels and monetization methods that show promise.</p>
        </div>
      </div>
    )
  },
  {
    title: "Phase 3: Consistent Revenue",
    subtitle: "$100 → $1000/month | 3-6 months",
    description: "Build predictable income streams and improve user retention.",
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-2">Key Tasks:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Refine your value proposition and optimize conversion funnels</li>
            <li>Implement advanced analytics and A/B testing</li>
            <li>Develop recurring revenue models such as subscriptions or memberships</li>
            <li>Increase backlink profile and domain authority for sustained SEO growth</li>
            <li>Automate marketing and outreach efforts where possible</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-200 p-3 rounded">
          <p className="text-sm font-medium text-amber-800">Pitfalls to Avoid</p>
          <p className="text-sm text-amber-700">Avoid complacency; ongoing optimization and user engagement are critical to maintain growth.</p>
        </div>
      </div>
    )
  },
  {
    title: "Phase 4: Scaling and Expansion",
    subtitle: "$1000+/month | 6+ months",
    description: "Scale traffic, revenue, and operations for sustainable growth.",
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-sm mb-2">Key Tasks:</h4>
          <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
            <li>Expand into new markets, languages, or verticals</li>
            <li>Outsource or hire to delegate content creation, development, and marketing</li>
            <li>Invest in paid advertising and partnerships</li>
            <li>Enhance product offerings and customer support</li>
            <li>Implement advanced retention strategies such as community building and personalized experiences</li>
          </ul>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-200 p-3 rounded">
          <p className="text-sm font-medium text-amber-800">Pitfalls to Avoid</p>
          <p className="text-sm text-amber-700">Scaling too fast without infrastructure can lead to burnout and quality issues.</p>
        </div>
      </div>
    )
  }
]

export default function Post() {
  return (
    <Container>
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Website Monetization Roadmap: From First Dollar to Sustainable Growth</h1>
          <p className="mt-2 text-sm text-muted-foreground">Published August 4, 2025</p>
        </header>

        <div className="space-y-8">
          <div className="prose lg:prose-lg max-w-none">
            <p>
              Website profitability is not about quick wins but long-term growth. This roadmap guides you through the stages of building a sustainable online business, from your first dollar to consistent revenue and scaling beyond.
            </p>
          </div>

          <Timeline items={timelineItems} className="my-12" />

          <div className="prose lg:prose-lg max-w-none">
            <h2>Conclusion</h2>
            <p>
              This roadmap outlines a clear path from your first dollar to sustainable website growth. By focusing on validation, expansion, consistent revenue, and scaling, you can build a profitable online business that grows steadily over time.
            </p>
            <p>
              With <a href="/" className="text-primary underline">Indie10k</a>, you can easily track all the missions and key tasks in this roadmap. Use our platform to organize your progress, stay motivated, and connect with a community of indie founders on the same journey.{" "}
            </p>
          </div>
        </div>
      </article>
    </Container>
  )
}