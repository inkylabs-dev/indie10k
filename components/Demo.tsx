import Container from "./Container"
import SectionHeading from "./SectionHeading"

export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-muted/50">
      <Container>
        <SectionHeading
          title="See Indie10k in Action"
          subtitle="Watch how daily missions and progress tracking work together"
        />

        <div className="mt-16 mx-auto max-w-4xl">
          <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 bg-background p-12 text-center">
            <div className="mx-auto h-64 w-full max-w-2xl rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Demo Coming Soon</h3>
                <p className="text-muted-foreground">
                  See the dashboard, daily missions, and progress tracking in action
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Dashboard preview showing daily missions, income tracking, and progress visualization
          </p>
        </div>
      </Container>
    </section>
  )
}
