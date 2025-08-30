import { SignUp } from "@stackframe/stack";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { isUserSystemEnabled } from "@/lib/user-system";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto">
            <Link href="/" className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Indie10k Logo" className="h-12 w-12 rounded-lg" />
              <span className="font-bold text-2xl">Indie10k</span>
            </Link>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Join Indie10k</CardTitle>
            <CardDescription className="text-base">
              Start your journey to making $10k online
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <SignUp automaticRedirect />
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}