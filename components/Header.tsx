import Container from "./Container"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">ITK</span>
            </div>
            <span className="font-bold text-xl">Indie10k</span>
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            {/* <a href="/#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a> */}
            <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <a href="/home" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </a>
            <a
              href="#hero"
              className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sign Up
            </a>
          </div>
        </div>
      </Container>
    </header>
  )
}
