import Container from "./Container"
import SectionHeading from "./SectionHeading"
import Button from "./Button"
import Badge from "./Badge"

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Start free, upgrade when you're ready to accelerate"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Free</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day mission challenge
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manual income tracking
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Basic progress tracking
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Community access
              </li>
            </ul>

            <Button className="w-full" variant="secondary">
              Start Free Challenge
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="rounded-xl border-2 border-primary bg-card p-8 shadow-sm relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>

            <div className="mb-6">
              <h3 className="text-2xl font-bold">Pro</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Everything in Free
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Advanced progress dashboard
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Daily email reminders
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Detailed analytics & insights
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Priority support
              </li>
            </ul>

            <Button className="w-full">Join Waitlist</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
