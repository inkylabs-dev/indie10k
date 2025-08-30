# User System PRD

## 1. Overview

The User System provides authentication, authorization, and user profile management for the application. It leverages **Neon Auth** as the identity provider, integrated directly with the Neon Postgres database. This removes the need for custom auth tables, reduces implementation complexity, and ensures a secure, scalable solution.

----------

## 2. Goals

-   **Enable account creation & login** via:
    
    -   Email/password
        
    -   OAuth providers (GitHub, Google — optional, extendable)
        
-   **Provide session management** using Neon Auth JWTs and SDK.
    
-   **Restrict access** to protected routes/pages.
    
-   **Expose user data** securely to both frontend (React components) and backend (server actions).
    
-   **Store user-related data** in application tables, linked by `user_id`.
    
-   **Support future extensibility** (e.g., multi-factor auth, roles, custom profile fields).
    

----------

## 3. Non-Goals

-   No custom session storage (NextAuth/Prisma not required).
    
-   No advanced RBAC or team management (may come later).
    
-   No external identity federation (Okta, Azure AD) in V1.
    

----------

## 4. Functional Requirements

### 4.1 Authentication

-   **Sign Up**
    
    -   Input: Email, password (minimum 8 characters), optional name.
        
    -   Validation: Email uniqueness enforced by Neon Auth.
        
    -   Outcome: User created in Neon Auth; mirrored in `neon_auth.users_sync`.
        
-   **Sign In**
    
    -   Input: Email + password OR OAuth provider login.
        
    -   Outcome: JWT issued, stored in secure cookie.
        
-   **Sign Out**
    
    -   Invalidate current session, remove cookie.
        
-   **Password Reset**
    
    -   User can request password reset via email (Neon Auth handles token + flow).
        

----------

### 4.2 Authorization

-   **Protected Routes**
    
    -   Server pages call `stackServerApp.getUser()`:
        
        -   If logged in → return user object.
            
        -   If not → redirect to `/handler/sign-in`.
            
-   **Data Access**
    
    -   Every application table includes a `user_id` column.
        
    -   Server actions / queries filtered by current user’s `id`.
        
    -   Optional: enable Row Level Security (RLS) at DB level for defense-in-depth.
        

----------

### 4.3 User Data

-   **Core Fields (from Neon Auth)**
    
    -   `id` (UUID)
        
    -   `email`
        
    -   `name`
        
    -   `created_at`
        
    -   `updated_at`
        
-   **Extended Fields (future)**
    
    -   Avatar image
        
    -   Preferences (theme, notifications)
        
    -   Roles (admin, member)
        

----------

### 4.4 UI

-   **Prebuilt Neon Auth pages** (via `<StackHandler/>`):
    
    -   `/handler/sign-in`
        
    -   `/handler/sign-up`
        
    -   `/handler/sign-out`
        
-   **Optional custom forms** using `<SignIn/>` and `<SignUp/>` components.
    
-   **Session-aware UI**:
    
    -   Show “Log in / Sign up” if not logged in.
        
    -   Show “Dashboard / Log out” if logged in.
        

----------

## 5. Technical Requirements

-   **Frontend**
    
    -   Next.js (App Router, Server Components).
        
    -   `@stackframe/stack` provider for client + server auth.
        
    -   React hooks/components: `<SignIn/>`, `<SignUp/>`.
        
-   **Backend**
    
    -   `stackServerApp.getUser()` for server-side session check.
        
    -   Database: Neon Postgres (with built-in `neon_auth.users_sync` table).
        
    -   SQL client: `@neondatabase/serverless` (for app data tables).
        
-   **Security**
    
    -   JWT validation handled by SDK.
        
    -   Sessions stored in secure, HTTP-only cookies.
        
    -   RLS policies for critical tables (optional, future).
        

----------

## 6. User Flows

### 6.1 Sign Up

1.  User visits `/handler/sign-up`.
    
2.  Fills in email + password.
    
3.  Neon Auth creates user, returns JWT.
    
4.  Session established in cookie.
    
5.  User redirected to dashboard `/app`.
    

### 6.2 Sign In

1.  User visits `/handler/sign-in`.
    
2.  Enters email/password.
    
3.  Neon Auth verifies → issues JWT.
    
4.  Session persisted in cookie.
    
5.  User redirected to `/app`.
    

### 6.3 Access Protected Page

1.  User navigates to `/app`.
    
2.  Server calls `stackServerApp.getUser()`.
    
3.  If valid session → render page.
    
4.  Else → redirect to `/handler/sign-in`.
    

----------

## 7. Success Metrics

-   95%+ login/signup success rate (excluding intentional test errors).
    
-   <200ms average auth check latency (server-side).
    
-   Seamless redirect from protected pages → sign-in → back to original page.
    

----------

## 8. Risks & Mitigations

-   **Vendor lock-in (Neon Auth)**: Accepted risk; mitigated by ability to migrate user table later.
    
-   **Session hijacking**: Mitigated by secure, HTTP-only cookies and HTTPS enforcement.
    
-   **RLS misconfiguration**: Will default to app-level filtering first, add RLS in future phase.
    

----------

## 9. Future Enhancements

-   Add **social logins** (Google, GitHub).
    
-   Add **multi-factor authentication** (SMS/email).
    
-   Add **user roles & permissions**.
    
-   Add **profile settings page**.
    
-   Expose **admin dashboard** for managing users.