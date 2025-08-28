import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function SocialProof() {
  const testimonials = [
    {
      quote:
        "Indie10k gave me the structure I needed. I went from $0 to $1,200 in my first month following their daily missions.",
      author: "Sarah Chen",
      title: "Full-stack Developer",
    },
    {
      quote:
        "The progress tracking kept me motivated. Seeing my income grow from $0 to $5k over 3 months was incredible.",
      author: "Marcus Rodriguez",
      title: "Mobile App Developer",
    },
    {
      quote:
        "Finally, a system that works. No more analysis paralysis - just clear daily actions that actually generate revenue.",
      author: "Emily Watson",
      title: "Frontend Developer",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <SectionHeading
          title="Join Thousands of Successful Indie Developers"
          subtitle="Real results from real developers who followed the system"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl border bg-card p-6 shadow-sm">
              <blockquote className="text-muted-foreground mb-4 text-pretty">"{testimonial.quote}"</blockquote>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-sm font-semibold text-primary">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
