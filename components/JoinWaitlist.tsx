"use client"

import type React from "react"
import { useState } from "react"
import Button from "./Button"

interface JoinWaitlistProps {
  className?: string
}

export default function JoinWaitlist({ className = "" }: JoinWaitlistProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          source: "hero",
          referrer: window.location.href
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.ok) {
          setMessage("Thanks! Check your email to confirm your spot on the waitlist.")
          setEmail("")
        }
      } else {
        const data = await response.json()
        if (response.status === 429) {
          setMessage("Too many requests. Please try again in a few minutes.")
        } else {
          setMessage(data.error || "Something went wrong. Please try again.")
        }
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
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
          {isSubmitting ? "Starting..." : "Join Waitlist"}
        </Button>
      </form>

      {message && (
        <p className={`mt-4 text-sm text-center ${message.includes("Thanks") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  )
}