# User System Implementation

This document outlines the implementation details for the User System based on the PRD requirements.

## Architecture Overview

The system is built using Next.js 14+ App Router with server-side rendering and server actions. Authentication is handled entirely by Neon Auth via the @stackframe/stack SDK, eliminating the need for custom auth tables or NextAuth.

## Key Implementation Decisions

### 1. Authentication Strategy
- **Neon Auth Integration**: Using @stackframe/stack SDK for complete auth handling
- **Server-Side Sessions**: All auth checks happen on the server using `stackServerApp.getUser()`
- **Automatic Redirects**: Protected routes automatically redirect unauthenticated users
- **Secure Cookies**: Stack manages HTTP-only secure cookies automatically
- **Environment Variable Control**: User system can be enabled/disabled via `ENABLE_USER_SYSTEM`

### 2. Database Design
- **Simple SQL Approach**: Using @neondatabase/serverless with tagged template literals instead of ORM
- **User Linking**: All user data tables include `user_id` field linking to Neon Auth users
- **Performance**: Added index on `user_id` for efficient queries

### 3. Security Implementation
- **Server-Side Validation**: All data access controlled at application level
- **User Isolation**: Every database query filtered by current user's ID  
- **Input Validation**: Server actions validate all inputs before database operations
- **Future RLS Ready**: Code structured to easily add Row Level Security later

### 4. Environment Variable Control
- **ENABLE_USER_SYSTEM**: Controls the entire user authentication system
- **When set (any value)**: Full user authentication enabled with Stack Auth
- **When unset/empty**: All auth-related routes redirect to `/#hero` section
- **Implementation**: Centralized control via `lib/user-system.ts` utility functions

## File Structure Analysis

### Core Configuration
- `lib/stack.ts` - Centralized Stack configuration for client and server apps
- `lib/user-system.ts` - Environment variable control utilities for user system
- `lib/db.ts` - Simple database connection using Neon serverless
- `next.config.ts` - Configured for serverless packages

### Authentication Flow
- `app/layout.tsx` - Root StackProvider wrapper for entire app
- `app/handler/[...stack]/page.tsx` - Catch-all handler for all Stack auth routes
- `app/login/page.tsx` - Custom login page using Stack components
- `app/register/page.tsx` - Custom registration page using Stack components

### Protected Application
- `app/app/page.tsx` - Protected dashboard requiring authentication
- `app/app/actions.ts` - Server actions for todo CRUD operations
- `app/page.tsx` - Public home page with conditional navigation

## Key Features Implemented

### 1. Complete Auth Flow
- Sign up with email/password
- Sign in with email/password  
- Sign out functionality
- Automatic session management
- Protected route access control

### 2. User Data Management
- User-specific todo creation
- List todos filtered by current user
- Toggle todo completion status
- Server-side data validation

### 3. Security Measures
- Server-side session validation
- User-scoped database queries
- Input sanitization
- Secure cookie handling

## Technical Highlights

### Environment Variable Control Pattern
```typescript
import { isUserSystemEnabled } from "@/lib/user-system";

// Check if user system is enabled
if (!isUserSystemEnabled()) {
  redirect("/#hero");
}
```

### Server Actions Pattern
```typescript
async function getCurrentUser() {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
```

### Protected Route Pattern
```typescript
export default async function DashboardPage() {
  if (!isUserSystemEnabled()) {
    redirect("/#hero");
  }
  
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/login");
  }
  // Page content here
}
```

### User-Scoped Queries
```typescript
const todos = await sql`
  SELECT * FROM public.todos 
  WHERE user_id = ${user.id}
  ORDER BY created_at DESC
`;
```

## Deployment Considerations

### Environment Variables
- All sensitive keys stored in environment variables
- Clear separation between client and server keys
- Example file provided for easy setup
- **ENABLE_USER_SYSTEM**: Controls whether the user authentication system is enabled

### Database Requirements
- Single table creation SQL provided
- Index for performance optimization
- RLS preparation documented but not enabled

### Platform Compatibility
- Configured for Vercel deployment
- Node.js runtime requirements specified
- Serverless-compatible database connection


## Local Development with Neon Local Connect (Ephemeral Branch)

1. **Install Neon Local Connect Extension in VS Code**
  - Open the Extensions panel (⇧⌘X) and search for `Neon Local Connect`.
  - Install the extension and follow its setup instructions.

2. **Create and Use an Ephemeral Branch**
  - In the Neon dashboard, create a new ephemeral branch from your main development branch for isolated local testing.
  - Copy the connection string for this branch.

3. **Update `.env.local`**
  - Set `DATABASE_URL` to the connection string for your ephemeral branch:
    ```env
    DATABASE_URL="<your-ephemeral-branch-connection-string>"
    ```

4. **Copy Neon Auth Configuration**
  - In your Neon project, go to **Auth** → **Configuration**.
  - Copy the following environment variables into `.env.local`:
    ```env
    NEXT_PUBLIC_STACK_PROJECT_ID="<your_project_id>"
    NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="<your_publishable_key>"
    STACK_SECRET_SERVER_KEY="<your_secret_key>"
    ```

5. **Push Database Schema**
  - Run the following command to initialize a clean database on your ephemeral branch:
    ```bash
    npm run db:push
    ```

6. **Start the Development Server**
  - Launch your app as usual:
    ```bash
    npm run dev
    ```

You now have a clean, isolated environment for development and testing, with Neon Auth and database fully configured.

## Setup Procedure

### 1. Install Dependencies
The @stackframe/stack dependency is already included in package.json:
```bash
npm install
```

### 2. Set Up Stack Auth (Neon Auth)
1. **Create Neon Auth Project**:
   - Go to [console.neon.tech](https://console.neon.tech)
   - Navigate to your project → **Auth** → **Configuration**
   - Enable Auth if not already enabled
   - Copy your Stack credentials

2. **Configure Environment Variables**:
   Update `.env.local` with your actual Stack auth credentials:
   ```env
   # Stack Auth (Neon Auth) - Replace with your actual values
   NEXT_PUBLIC_STACK_PROJECT_ID="your_actual_project_id"
   NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="your_actual_publishable_key"
   STACK_SECRET_SERVER_KEY="your_actual_secret_key"
   
   # User System Control - Set to any value to enable user authentication
   # If not set or empty, users will be redirected to /#hero instead of login/register
   ENABLE_USER_SYSTEM="true"
   ```

### 3. Push Database Schema
Generate and push the todos table schema:
```bash
npm run db:push
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Test the System
- Visit `http://localhost:3000/login` to test sign up/login
- Try accessing protected routes like `/dashboard`, `/home`, `/analytics`
- Verify user-specific data isolation with todos

### Common Setup Issues

**"Module not found: @stackframe/stack"**
- Ensure you've run `npm install`
- Clear Next.js cache: `rm -rf .next && npm run dev`

**"Missing required error components"**
- This usually means Stack auth environment variables are not set
- Verify all three Stack environment variables are properly configured
- Restart dev server after updating `.env.local`

**Auth redirects not working**
- Check that the handler route exists at `app/handler/[...stack]/page.tsx`
- Verify StackProvider wraps the app in `app/layout.tsx`
- Confirm environment variables are loaded (restart dev server)

## Future Enhancement Points

1. **Row Level Security**: Code is structured to easily add RLS policies
2. **Social Login**: Stack configuration ready for OAuth providers
3. **User Profiles**: User object available for extended profile features
4. **Admin Functions**: User role system can be added to Stack configuration
5. **Real-time Features**: WebSocket integration possible with current architecture

## Testing Hooks

The implementation includes hooks for future testing:
- Clear component boundaries for unit testing
- Server action isolation for integration testing
- Protected route patterns for e2e testing
- Environment variable configuration for test environments

## Success Criteria Met

✅ **Authentication**: Complete sign up/in/out flow implemented
✅ **Protected Routes**: Server-side session validation with automatic redirects  
✅ **User Data**: Todo system with user-scoped data access
✅ **Security**: Input validation and user isolation implemented
✅ **TypeScript**: Full type safety with strict configuration
✅ **Deployment Ready**: Complete with documentation and examples
✅ **Minimal Styling**: Clean semantic HTML with basic CSS
✅ **Performance**: Optimized queries with proper indexing

The implementation fully satisfies all requirements from the PRD while maintaining simplicity, security, and scalability.

## Behavior Changes Based on ENABLE_USER_SYSTEM

### When ENABLE_USER_SYSTEM is Set (Enabled)
- **Login/Signup Links**: Point to `/login` and `/register` pages
- **Authentication Flow**: Full Stack Auth integration with user sessions
- **Protected Routes**: Redirect to `/login` for unauthenticated access
- **User Features**: All dashboard, settings, missions, income, analytics features available

### When ENABLE_USER_SYSTEM is Not Set (Disabled)
- **Login/Signup Links**: Point to `/#hero` section of landing page
- **Authentication Pages**: `/login` and `/register` redirect to `/#hero`
- **Protected Routes**: All protected routes redirect to `/#hero`
- **Server Actions**: Auth-required server actions redirect to `/#hero`
- **User Features**: Disabled, focusing users on landing page content

This dual-mode approach allows the same codebase to operate as either:
1. A full-featured application with user authentication
2. A simple landing page without user system complexity