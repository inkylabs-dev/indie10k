import Container from "./Container"
import ThemeToggle from "./ThemeToggle"
import { stackServerApp } from "@/lib/stack"
import { isUserSystemEnabled } from "@/lib/user-system"
import { Button } from "./ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu, User } from "lucide-react"

export default async function Header() {
  let user = null;
  const userSystemEnabled = isUserSystemEnabled();
  
  if (userSystemEnabled) {
    try {
      user = await stackServerApp.getUser();
    } catch (error) {
      console.error("Auth error in Header:", error);
      // Continue with user = null to show logged out state
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Indie10k Logo" className="h-8 w-8 rounded-lg" />
            <span className="font-bold text-xl">Indie10k</span>
          </a>

          {userSystemEnabled && user ? (
            <>
              {/* Desktop Navigation for Logged-in Users */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/home" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </a>
                <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
                  Features
                </a>
                <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                  Blog
                </a>
                <a href="/faq" className="text-sm font-medium hover:text-primary transition-colors">
                  FAQ
                </a>
              </nav>

              {/* Desktop Controls for Logged-in Users */}
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profileImageUrl || ""} alt={user.displayName || "User"} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-background border shadow-md" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <a href="/home" className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5">Home</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/missions" className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5">Missions</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/income" className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5">Income</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/settings" className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5">Settings</a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href="/handler/sign-out" className="cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1.5">Sign Out</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile Navigation for Logged-in Users */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="text-left">Navigation</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profileImageUrl || ""} alt={user.displayName || "User"} />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.displayName || "User"}</span>
                      </div>
                      <a href="/home" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Home
                      </a>
                      <a href="/missions" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Missions
                      </a>
                      <a href="/income" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Income
                      </a>
                      <a href="/settings" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Settings
                      </a>
                      <hr className="my-2" />
                      <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Features
                      </a>
                      <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Blog
                      </a>
                      <a href="/faq" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        FAQ
                      </a>
                      <hr className="my-2" />
                      <a href="/handler/sign-out" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors py-2">
                        Sign Out
                      </a>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Navigation for Logged-out Users */}
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
                  Features
                </a>
                <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                  Blog
                </a>
                <a href="/faq" className="text-sm font-medium hover:text-primary transition-colors">
                  FAQ
                </a>
              </nav>

              {/* Desktop Controls for Logged-out Users */}
              <div className="hidden md:flex items-center space-x-4">
                <ThemeToggle />
                <a href={userSystemEnabled ? "/login" : "/#hero"} className="text-sm font-medium hover:text-primary transition-colors">
                  Login
                </a>
                <a
                  href={userSystemEnabled ? "/register" : "/#hero"}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Sign Up
                </a>
              </div>

              {/* Mobile Navigation for Logged-out Users */}
              <div className="md:hidden flex items-center space-x-2">
                <ThemeToggle />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="text-left">Navigation</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-6">
                      <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Features
                      </a>
                      <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Blog
                      </a>
                      <a href="/faq" className="text-sm font-medium hover:text-primary transition-colors py-2">
                        FAQ
                      </a>
                      <hr className="my-4" />
                      <a href={userSystemEnabled ? "/login" : "/#hero"} className="text-sm font-medium hover:text-primary transition-colors py-2">
                        Login
                      </a>
                      <a href={userSystemEnabled ? "/register" : "/#hero"} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2">
                        Sign Up
                      </a>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
