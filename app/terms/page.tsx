import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@/components/Container"

export default function Terms() {
  // Avoid hydration mismatch by using a static date string
  const lastUpdated = "August 29, 2025";
  return (
    <>
      <Header />
      <main className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Indie10k ("the Service"), you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Indie10k is a platform that provides tools and resources to help indie developers grow their 
                  income through daily missions, income tracking, and progress analytics. The service includes 
                  both free and premium features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, 
                  and current at all times. You are responsible for safeguarding the password and for all 
                  activities under your account.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• You must be at least 18 years old to use our service</li>
                  <li>• You are responsible for maintaining account security</li>
                  <li>• You must notify us immediately of any unauthorized access</li>
                  <li>• One person or legal entity may maintain only one account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree to use Indie10k only for lawful purposes and in accordance with these Terms. 
                  You agree not to use the service:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• In any way that violates applicable laws or regulations</li>
                  <li>• To transmit or distribute malicious software or harmful content</li>
                  <li>• To impersonate or attempt to impersonate another person or entity</li>
                  <li>• To interfere with or disrupt the service or servers</li>
                  <li>• To collect or harvest personal information from other users</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Subscription and Billing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Some features of Indie10k require a paid subscription. By purchasing a subscription, you agree to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Pay all applicable fees as described on our pricing page</li>
                  <li>• Automatic renewal of your subscription unless cancelled</li>
                  <li>• Price changes with 30 days advance notice</li>
                  <li>• Our 30-day refund policy for new subscriptions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The service and its original content, features, and functionality are and will remain the 
                  exclusive property of Indie10k and its licensors. The service is protected by copyright, 
                  trademark, and other laws. You retain ownership of any data you input into the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Privacy and Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of the service, to understand our practices regarding your personal information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Service Availability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We strive to maintain high availability but cannot guarantee uninterrupted access to our 
                  service. We may temporarily suspend access for maintenance, updates, or technical issues. 
                  We are not liable for any damages resulting from service interruptions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall Indie10k, its directors, employees, or agents be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, including without limitation, loss of 
                  profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any 
                  reason whatsoever, including without limitation if you breach the Terms. Upon termination, your 
                  right to use the service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p>Email: legal@indie10k.com</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}