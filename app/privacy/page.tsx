import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Container from "@/components/Container"

export default function Privacy() {
  // Avoid hydration mismatch by using a static date string
  const lastUpdated = "August 29, 2025";
  return (
    <>
      <Header />
      <main className="py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  update your profile, or contact us for support.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Account information (email, username, password)</li>
                  <li>• Profile information (name, bio, preferences)</li>
                  <li>• Income and mission data you voluntarily input</li>
                  <li>• Usage data and analytics</li>
                  <li>• Communication records when you contact support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Provide and operate the Indie10k platform</li>
                  <li>• Send you daily missions and progress updates</li>
                  <li>• Generate analytics and insights about your progress</li>
                  <li>• Respond to your comments, questions, and support requests</li>
                  <li>• Send you technical notices and security alerts</li>
                  <li>• Improve our services and develop new features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties. 
                  We may share your information only in the following limited circumstances:
                </p>
                <ul className="space-y-2 text-muted-foreground mt-4">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal obligations</li>
                  <li>• To protect our rights, property, or safety</li>
                  <li>• With service providers who assist in operating our platform</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. This includes 
                  encryption of sensitive data, secure transmission protocols, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and 
                  fulfill the purposes outlined in this policy. You may request deletion of your account 
                  and associated data at any time by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access and update your personal information</li>
                  <li>• Request deletion of your account and data</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Opt out of non-essential communications</li>
                  <li>• Contact us with privacy-related questions or concerns</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Cookies and Analytics</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                  and improve our services. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <div className="mt-4 text-muted-foreground">
                  <p>Email: contact@indie10k.com</p>
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