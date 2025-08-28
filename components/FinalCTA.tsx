import Container from "./Container"
import JoinWaitlist from "./JoinWaitlist"

export default function FinalCTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Ready to Make Your First $1000 Online?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-pretty">
            Join thousands of indie developers who've stopped guessing and started growing. Your 30-day challenge begins
            today.
          </p>
          <div className="mt-10">
            <JoinWaitlist />
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            ✓ Free to start ✓ No credit card required ✓ Cancel anytime
          </p>
        </div>
      </Container>
    </section>
  )
}
