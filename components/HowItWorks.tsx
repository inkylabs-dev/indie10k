import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Start Your 30-Day Challenge",
      description:
        "Sign up and get your first daily mission. Each mission is designed to move you closer to your first $1000.",
    },
    {
      step: "2",
      title: "Complete Daily Missions",
      description:
        "Follow specific, actionable tasks every day. Build products, find customers, and generate your first revenue.",
    },
    {
      step: "3",
      title: "Track Your Progress",
      description:
        "Watch your income grow from $0 to $1000 to $10k. Celebrate milestones and stay motivated with clear progress.",
    },
  ]

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title="How It Works" subtitle="Three simple steps to your first $1000 online" />

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
