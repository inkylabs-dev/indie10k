"use client"

import { useState } from "react"
import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How is this different from other courses or programs?",
      answer:
        "Unlike courses that dump information on you, Indie10k gives you specific daily missions. You'll know exactly what to do each day to move closer to your first $1000. It's action-focused, not theory-heavy.",
    },
    {
      question: "What if I'm a complete beginner with no business experience?",
      answer:
        "Perfect! Indie10k is designed for developers who want to monetize their skills but don't know where to start. The daily missions start simple and gradually build complexity as you progress.",
    },
    {
      question: "How much time do I need to commit each day?",
      answer:
        "Most daily missions take 30-60 minutes to complete. The key is consistency, not long hours. Small daily actions compound into significant results over time.",
    },
    {
      question: "What kind of income can I expect?",
      answer:
        "While results vary, our system is specifically designed to help you reach your first $1000 online. Many users see their first revenue within the first 30 days, with $1000+ typically achieved within 2-3 months of consistent action.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes! If you complete all daily missions for 30 days and don't see progress toward your first $1000, we'll refund your Pro subscription. We're confident in our system because it works.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-muted/50">
      <Container>
        <SectionHeading title="Frequently Asked Questions" subtitle="Everything you need to know about Indie10k" />

        <div className="mt-16 max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border bg-card shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-pretty">{faq.question}</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground text-pretty">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
