"use client"

import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function Strengths() {
  const strengths = [
    {
      title: "Effective",
      description:
        "Proven methods that deliver real results. Our system has helped thousands achieve their first $1000 milestone.",
      emoji: "✅",
    },
    {
      title: "Stay Motivated",
      description:
        "Keep your momentum with streaks, achievements, and daily wins. Never lose sight of your progress.",
      emoji: "🔥",
    },
    {
      title: "Personalized Missions",
      description:
        "Tailored daily tasks that match your skills, interests, and goals. No generic advice—everything is built for you.",
      emoji: "🎯",
    },
    {
      title: "Research-Backed Methods",
      description:
        "Built on proven behavioral science and successful entrepreneur strategies. Delightful missions that actually work.",
      emoji: "💡",
    },
  ]

  return (
    <section className="py-32 bg-slate-50">
      <style jsx>{`
        @keyframes flip {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
        }
      `}</style>
      <Container>
        <SectionHeading
          title="Why Indie10K Works"
          subtitle="The proven approach to your first $1000 online"
        />

        <div className="mt-24 space-y-32 max-w-6xl mx-auto">
          {strengths.map((strength, index) => (
            <div key={index} className={`flex items-center gap-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              <div className="flex-1 flex justify-center">
                <div className="text-8xl" style={{animation: 'flip 2s ease-in-out infinite'}}>{strength.emoji}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-4xl font-bold mb-6 text-balance">{strength.title}</h3>
                <p className="text-muted-foreground text-xl leading-relaxed">{strength.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}