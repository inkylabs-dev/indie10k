import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Strengths from "@/components/Strengths"
import Features from "@/components/Features"
import SocialProof from "@/components/SocialProof"
import FinalCTA from "@/components/FinalCTA"
import Footer from "@/components/Footer"
import StatusNotification from "@/components/StatusNotification"

export default function LandingPage() {
  return (
    <>
      <Header />
      <StatusNotification />

      {/* Hero */}
      <Hero />

      {/* Why It Works / Strengths */}
      <Strengths />

      {/* How It Works / Features */}
      <Features />

      {/* Testimonials */}
      <SocialProof />

      {/* Bottom CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </>
  )
}
