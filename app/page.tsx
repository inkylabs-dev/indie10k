import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import SocialProof from "@/components/SocialProof"
import Footer from "@/components/Footer"

export default function LandingPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <Hero />

      {/* How It Works / Features */}
      <Features />

      {/* Testimonials */}
      <SocialProof />

      {/* Footer */}
      <Footer />
    </>
  )
}
