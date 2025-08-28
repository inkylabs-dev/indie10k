import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function Features() {
  const features = [
    {
      title: "Daily Missions",
      description:
        "Get specific, actionable tasks every day that move you closer to your first $1000. No more wondering what to do next.",
      icon: (
        <div className="h-6 w-6 rounded bg-blue-500 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-white"></div>
        </div>
      ),
    },
    {
      title: "Income Tracking",
      description:
        "Track every dollar you make with beautiful charts and insights. Watch your progress from $0 to $1000 to $10k.",
      icon: (
        <div className="h-6 w-6 rounded bg-green-500 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-white"></div>
        </div>
      ),
    },
    {
      title: "Progress Dashboard",
      description:
        "See your journey visualized with milestones, streaks, and achievements. Stay motivated with clear progress indicators.",
      icon: (
        <div className="h-6 w-6 rounded bg-purple-500 flex items-center justify-center">
          <div className="h-3 w-3 rounded-sm bg-white"></div>
        </div>
      ),
    },
  ]

  return (
    <section id="features" className="py-20">
      <Container>
        <SectionHeading
          title="Everything You Need to Succeed"
          subtitle="Stop guessing and start following a proven system"
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-pretty">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
