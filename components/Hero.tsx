"use client"

import type React from "react"

import { useState } from "react"
import Container from "./Container"
import Button from "./Button"

export default function Hero() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setMessage("Thanks! Check your email to get started.")
        setEmail("")
      } else {
        const data = await response.json()
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="hero" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
            Stop guessing. Start growing. <span className="text-primary">Make your first $1000 online.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Help indie developers go from $0 → $1000 → $10k with daily missions, income tracking, and progress
            dashboards. Join thousands who've already started their journey.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Email address"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Starting..." : "Start Free 30-Day Challenge"}
              </Button>
            </form>
          </div>

          {message && (
            <p className={`mt-4 text-sm ${message.includes("Thanks") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="mt-8">
            <Button variant="secondary" asChild>
              <a href="#demo">See Demo</a>
            </Button>
          </div>

          <div className="mt-16 text-sm text-muted-foreground">
            <p>✓ Free 30-day challenge ✓ No credit card required ✓ Cancel anytime</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
