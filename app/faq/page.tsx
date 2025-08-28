import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@/components/Container"

export default function FAQ() {
  const faqs = [
    {
      question: "What is Indie10k?",
      answer: "Indie10k is a platform designed to help indie developers grow their income from $0 to $1000 to $10k through daily missions, income tracking, and progress dashboards."
    },
    {
      question: "How do daily missions work?",
      answer: "Daily missions are actionable tasks designed to help you build and grow your indie projects. Each mission focuses on key areas like product development, marketing, or revenue generation."
    },
    {
      question: "Is there a free tier?",
      answer: "Yes! We offer a free tier that includes basic income tracking and access to select daily missions. Premium features are available with our paid plans."
    },
    {
      question: "How does income tracking work?",
      answer: "Our income tracking system allows you to log revenue from multiple sources, categorize income streams, and visualize your progress over time with detailed analytics."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied, contact us for a full refund."
    }
  ]

  return (
    <>
      <Header />
      <main className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about Indie10k
              </p>
            </div>

            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-8 last:border-b-0">
                  <h2 className="text-xl font-semibold mb-3">{faq.question}</h2>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Get in touch with our team.
              </p>
              <a
                href="mailto:hello@indie10k.com"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}