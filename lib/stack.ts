/**
 * stack.ts
 *
 * Provides initialized StackClientApp and StackServerApp instances for authentication and API access
 * using the @stackframe/stack library. Handles both client-side and server-side configuration for Next.js.
 *
 * - `stackClientApp`: Used on the client for authentication and API calls, configured with public keys.
 * - `stackServerApp`: Used on the server for secure operations, configured with secret server key and route URLs.
 *
 * Environment variables required:
 *   - NEXT_PUBLIC_STACK_PROJECT_ID
 *   - NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
 *   - STACK_SECRET_SERVER_KEY (server only)
 *
 * Usage:
 *   import { stackClientApp, stackServerApp } from "@/lib/stack";
 */
import { StackClientApp, StackServerApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
  publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
});

// Only create server app on server-side
let stackServerApp: StackServerApp;

if (typeof window === "undefined") {
  stackServerApp = new StackServerApp({
    tokenStore: "nextjs-cookie",
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
    secretServerKey: process.env.STACK_SECRET_SERVER_KEY!,
    urls: {
      handler: "/handler",
      signIn: "/login",
      signUp: "/register",
      afterSignIn: "/home",
      afterSignUp: "/home",
    },
  });
}

export { stackServerApp };