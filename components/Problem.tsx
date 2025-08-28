import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function Problem() {
  return (
    <section className="py-20 bg-muted/50">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading
            title="The Indie Developer's Dilemma"
            subtitle="You're stuck in the endless cycle of building without earning"
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-red-500"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Building in the Dark</h3>
              <p className="text-muted-foreground text-pretty">
                You spend months building products without knowing if anyone wants them. No clear path from idea to
                income.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-orange-500"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analysis Paralysis</h3>
              <p className="text-muted-foreground text-pretty">
                Overwhelmed by endless tutorials and advice. You know what to do but struggle to take consistent action.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Zero to Show</h3>
              <p className="text-muted-foreground text-pretty">
                Despite your skills, you have nothing to show for your efforts. Still at $0 after months or years of
                trying.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
