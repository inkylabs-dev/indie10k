"use client"

import { TypeAnimation } from 'react-type-animation';
import Container from "./Container"
import JoinWaitlist from "./JoinWaitlist"

export default function Hero() {

  return (
    <section id="hero" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-balance">
            Stop guessing. Start growing. <span className="text-primary">Make your first
              $10k.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Help indie developers go from $0 → $100 → $1k → $10k with daily missions and income tracking.
            <br />
            Join thousands who've already started their journey.
          </p>

          <div className="mt-10">
            <JoinWaitlist />
          </div>

          {/*<div className="mt-8">
            <Button variant="secondary" asChild>
              <a href="#demo">See Demo</a>
            </Button>
          </div>*/}

          <div className="mt-16 text-sm text-muted-foreground">
            <p>✓ Free 30-day challenge ✓ No credit card required ✓ Cancel anytime</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
