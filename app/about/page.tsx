import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@/components/Container"

export default function About() {
  return (
    <>
      <Header />
      <main className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">About Indie10k</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Empowering indie developers to build sustainable businesses and achieve financial independence
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="grid gap-16">
                <section>
                  <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    We believe every indie developer has the potential to build a successful business. 
                    Indie10k was created to bridge the gap between having a great idea and turning it into 
                    sustainable income. Our platform provides the structure, guidance, and tools needed to 
                    systematically grow from $0 to $1000 to $10k in monthly recurring revenue.
                  </p>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                    Many talented developers struggle with the business side of indie development:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Lack of clear roadmap from idea to revenue
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Difficulty staying consistent with business development
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      No visibility into income progress and trends
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Feeling overwhelmed by all the aspects of running a business
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                    Indie10k breaks down the journey to $10k into manageable daily actions and provides 
                    the tools to track your progress every step of the way.
                  </p>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary text-2xl">🎯</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Daily Missions</h3>
                      <p className="text-muted-foreground text-sm">
                        Actionable daily tasks that move you closer to your revenue goals
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary text-2xl">📊</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Income Tracking</h3>
                      <p className="text-muted-foreground text-sm">
                        Comprehensive tracking of all your revenue streams and growth metrics
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary text-2xl">🚀</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Progress Dashboard</h3>
                      <p className="text-muted-foreground text-sm">
                        Visual insights into your journey from $0 to $10k
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-3xl font-bold mb-6">Join the Community</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Thousands of indie developers are already using Indie10k to build their businesses. 
                    Join a community of like-minded creators who support each other's success and share 
                    insights from their journey to financial independence.
                  </p>
                  <div className="mt-8 text-center">
                    <a
                      href="/register"
                      className="inline-flex items-center px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Start Your Journey Today
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}