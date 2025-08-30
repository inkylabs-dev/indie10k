import { SignIn } from "@stackframe/stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { isUserSystemEnabled } from "@/lib/user-system";
import { redirect } from "next/navigation";

export default function LoginPage() {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto">
            <Link href="/" className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Indie10k Logo" className="h-12 w-12 rounded-lg" />
              <span className="font-bold text-2xl">Indie10k</span>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <SignIn automaticRedirect firstTab="password" />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
