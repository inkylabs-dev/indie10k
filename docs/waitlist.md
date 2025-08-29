# Waitlist Implementation

A complete waitlist signup and email confirmation system with optional bot protection and rate limiting.

## Overview

The waitlist system provides:
- Email collection with validation
- Email confirmation flow
- Optional Cloudflare Turnstile bot protection
- Optional Upstash Redis rate limiting
- Secure token generation
- HTML email templates

## Architecture

```
POST /api/waitlist
├── Input validation (Zod)
├── Rate limiting (optional)
├── Bot protection (Turnstile, optional)
├── Database upsert
├── Email confirmation
└── Response

GET /waitlist/confirm
├── Token & email validation
├── Database update
└── Redirect with status
```

## Database Schema

**waitlist table:**
- `email` (text, primary key) - Normalized lowercase email
- `name` (text, nullable) - User's name
- `source` (text, nullable) - Signup source (e.g., "hero", "footer")
- `utm` (json, nullable) - UTM tracking parameters
- `referrer` (text, nullable) - Referrer URL
- `created_at` (timestamptz) - Signup timestamp
- `confirmed_at` (timestamptz, nullable) - Email confirmation timestamp
- `confirm_token` (text, nullable) - Email confirmation token

**Indexes:**
- Unique index on `email`
- Index on `confirm_token` for fast lookups

## API Endpoints

### POST /api/waitlist

Accepts new waitlist signups.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "source": "hero",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "summer"
  },
  "referrer": "https://example.com",
  "turnstileToken": "optional-token"
}
```

**Response:**
```json
{ "ok": true }
```

**Error Responses:**
- `400` - Invalid input data, failed Turnstile verification
- `429` - Rate limit exceeded
- `500` - Internal server error

### GET /waitlist/confirm

Confirms email addresses via token.

**Query Parameters:**
- `token` - Confirmation token from email
- `email` - Email address to confirm

**Responses:**
- Redirects to `/?status=confirmed` on success
- Redirects to `/?status=invalid` on failure

## Environment Variables

Required:
```env
DATABASE_URL="postgres://USER:PASSWORD@HOST/db?sslmode=require"
NEXT_PUBLIC_SITE_URL="https://localhost:3000"
RESEND_API_KEY="re_..."
EMAIL_FROM="Indie10k <hello@yourdomain.com>"
```

Optional:
```env
# Bot protection
TURNSTILE_SECRET_KEY=""

# Rate limiting
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

## Core Components

### Backend Components

#### lib/schema.ts
- Drizzle ORM schema definition
- Email normalization helper
- Database indexes

#### lib/validators.ts
- Zod validation schemas
- Input sanitization
- Type safety

#### lib/email.ts
- Resend email integration
- HTML email templates
- Error handling

#### lib/turnstile.ts
- Optional Cloudflare Turnstile verification
- Graceful degradation when not configured
- API integration

#### lib/ratelimit.ts
- Optional Upstash Redis rate limiting
- 5 requests per minute per IP+email
- Fail-open design

#### lib/db.ts
- Smart database connection selection:
  - `pg` driver for local development (localhost/127.0.0.1)
  - `@neondatabase/serverless` for remote databases (Neon/Vercel/Supabase)
- Connection pooling
- Schema export

### Frontend Components

#### components/JoinWaitlist.tsx
- React form component for email collection
- Integrated with `/api/waitlist` endpoint
- Handles success/error states
- Includes rate limit error handling
- Automatically adds `source` and `referrer` tracking

#### app/page.tsx
- Landing page with confirmation status handling
- Displays success/error messages from email confirmation
- URL parameter handling for `?status=confirmed` and `?status=invalid`
- Auto-dismissible notification banners

## Security Features

1. **Email Normalization**: All emails stored in lowercase, trimmed
2. **Secure Tokens**: 24-byte random tokens for confirmation
3. **Rate Limiting**: Prevents abuse (5 req/min per IP+email)
4. **Bot Protection**: Optional Turnstile integration
5. **Error Handling**: No information leakage in error messages
6. **Input Validation**: Zod schema validation on all inputs

## Email Template

The confirmation email includes:
- Friendly welcome message
- Primary CTA button with confirmation link
- Plain text fallback link
- Professional styling
- Clear instructions

## Database Operations

**Signup Flow:**
1. Normalize email to lowercase
2. Generate secure 48-character hex token
3. Upsert record (handles duplicates gracefully)
4. Send confirmation email
5. Return success response

**Confirmation Flow:**
1. Validate token and email parameters
2. Look up waitlist entry by email
3. Verify token matches and exists
4. Update `confirmed_at` timestamp
5. Clear `confirm_token`
6. Redirect with status

## Testing

Run the test suite:
```bash
npm run test
```

Tests cover:
- Input validation with various scenarios
- Email normalization
- Optional service integration (Turnstile, rate limiting)
- Database operations (mocked)
- End-to-end signup flow

## Setup Instructions

### Option 1: Local Development with Docker (Recommended)

1. **Install Dependencies:**
   ```bash
   npm install drizzle-orm @neondatabase/serverless pg zod resend
   npm install -D drizzle-kit @types/pg vitest dotenv-cli
   ```

2. **Start PostgreSQL Database:**
   ```bash
   # Start PostgreSQL container
   docker-compose up -d postgres
   
   # Verify database is running
   docker-compose ps
   ```

3. **Environment Setup:**
   ```bash
   cp .env.local.docker .env.local
   # Edit .env.local and add your RESEND_API_KEY
   ```

   **Important:** Make sure `.env.local` exists before running database commands. If the file doesn't exist, database scripts will fail.

4. **Database Migration:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Development:**
   ```bash
   npm run dev
   npm run test
   ```

6. **Optional: Database Management:**
   ```bash
   # Start pgAdmin for database management
   docker-compose --profile admin up -d
   # Access at http://localhost:5050
   # Login: admin@indie10k.com / admin123
   ```

### Option 2: Production Setup (Neon/External Database)

1. **Install Dependencies:**
   ```bash
   npm install drizzle-orm @neondatabase/serverless pg zod resend
   npm install -D drizzle-kit @types/pg vitest dotenv-cli
   ```

2. **Environment Setup:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your production database URL and API keys
   ```

3. **Database Migration:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Development:**
   ```bash
   npm run dev
   npm run test
   ```

## Docker Configuration

### Docker Compose Services

The `docker-compose.yaml` provides:

- **PostgreSQL 15**: Main database server
  - Database: `indie10k`
  - User: `postgres`
  - Password: `password`
  - Port: `5432`
  - Persistent volume: `postgres_data`

- **pgAdmin** (Optional): Web-based database management
  - URL: http://localhost:5050
  - Email: admin@indie10k.com
  - Password: admin123
  - Only starts with `--profile admin` flag

### Docker Commands

```bash
# Start only PostgreSQL
docker-compose up -d postgres

# Start PostgreSQL + pgAdmin
docker-compose --profile admin up -d

# View logs
docker-compose logs postgres
docker-compose logs pgadmin

# Stop services
docker-compose down

# Reset database (removes all data)
docker-compose down -v
```

### Database Connection

When using Docker, your `DATABASE_URL` should be:
```
DATABASE_URL="postgres://postgres:password@localhost:5432/indie10k"
```

### Database Scripts

The following npm scripts are available for database management:

```bash
# Generate migration files from schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Open Drizzle Studio (web-based database browser)
npm run db:studio

# Drop database tables
npm run db:drop

# Run migrations (if using migration files)
npm run db:migrate
```

**Prerequisites:** 
- Ensure `.env.local` file exists with `DATABASE_URL`
- All scripts automatically load environment variables from `.env.local`

**Development Workflow:**
1. Make schema changes in `lib/schema.ts`
2. Generate migration: `npm run db:generate`
3. Apply changes: `npm run db:push`
4. View data: `npm run db:studio` (opens at http://localhost:4983)

**Alternative Commands (if .env.local issues):**
```bash
# If npm scripts fail, use these direct commands:
DATABASE_URL="postgres://postgres:password@localhost:5432/indie10k" npx drizzle-kit push
DATABASE_URL="postgres://postgres:password@localhost:5432/indie10k" npx drizzle-kit studio
```

## Frontend Integration

### JoinWaitlist Component Usage

The `JoinWaitlist` component is already integrated and ready to use. It automatically:

1. **Sends data to `/api/waitlist`** with the following payload:
   ```json
   {
     "email": "user@example.com",
     "source": "hero",
     "referrer": "https://yoursite.com/"
   }
   ```

2. **Handles different response scenarios**:
   - Success: Shows confirmation message to check email
   - Rate limit (429): Shows specific rate limit message
   - Validation errors (400): Shows generic error message
   - Server errors (500): Shows generic error message

3. **Provides user feedback**:
   - Loading state during submission
   - Success/error messages with appropriate styling
   - Form reset on successful submission

### Landing Page Status Handling

The main landing page (`app/page.tsx`) automatically handles email confirmation status:

- **Confirmed emails**: Shows success banner with 🎉 icon
- **Invalid links**: Shows error banner with ❌ icon
- **Auto-dismiss**: Users can close notifications manually

### Integration Example

To use the waitlist in other components:

```tsx
import JoinWaitlist from "@/components/JoinWaitlist"

export default function MyPage() {
  return (
    <div>
      <h1>Join Our Waitlist</h1>
      <JoinWaitlist className="mt-8" />
    </div>
  )
}
```

### Customizing Source Tracking

To customize the source tracking for different pages/components:

```tsx
// In components/JoinWaitlist.tsx, modify the source value:
body: JSON.stringify({ 
  email,
  source: "footer", // Change this based on location
  referrer: window.location.href
})
```

## Testing Locally

**Frontend Test:**
1. Start the development server: `npm run dev`
2. Navigate to your landing page
3. Enter an email in the waitlist form
4. Check for success message
5. Check your email for confirmation link
6. Click confirmation link
7. Verify redirect with success status

**API Test:**
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "content-type: application/json" \
  -d '{"email":"you@example.com","source":"hero"}'
```

**Confirmation Test:**
1. Check your email for confirmation link
2. Click link or visit manually
3. Verify redirect to `/?status=confirmed` with success banner
4. Test invalid link: `http://localhost:3000/waitlist/confirm?token=invalid&email=test@example.com`
5. Verify redirect to `/?status=invalid` with error banner

## Deployment Instructions

### Vercel + Neon Database Deployment

#### 1. Database Setup (Neon)

1. **Create Neon Database:**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy the connection string (starts with `postgresql://`)

2. **Configure Database Connection:**
   - Update your `.env.local` for local testing:
     ```env
     DATABASE_URL="postgresql://username:password@host/dbname?sslmode=require"
     ```

3. **Run Database Migrations:**
   ```bash
   # Generate migration files
   npm run db:generate
   
   # Push schema to Neon database
   npm run db:push
   
   # Verify tables were created
   npm run db:studio
   ```

#### 2. Email Setup (Resend)

1. **Get Resend API Key:**
   - Sign up at [resend.com](https://resend.com)
   - Create an API key
   - Verify your sending domain

2. **Configure Email Settings:**
   ```env
   RESEND_API_KEY="re_your_api_key_here"
   EMAIL_FROM="Your App <hello@yourdomain.com>"
   ```

#### 3. Vercel Deployment

1. **Connect Repository:**
   - Push your code to GitHub/GitLab
   - Connect repository to Vercel
   - Import your project

2. **Configure Environment Variables:**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   DATABASE_URL=postgresql://username:password@host/dbname?sslmode=require
   NEXT_PUBLIC_SITE_URL=https://yourapp.vercel.app
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Your App <hello@yourdomain.com>
   ```

   **Optional variables:**
   ```
   TURNSTILE_SECRET_KEY=your_turnstile_secret
   UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

3. **Deploy:**
   - Vercel will automatically deploy on git push
   - Monitor deployment logs for any issues
   - Visit your live URL to test

4. **Run Database Migrations:**
   After deployment, set up your database schema:
   ```bash
   # Link your local project to Vercel (one-time setup)
   npx vercel link
   
   # Run production database migrations
   npm run db:push:prod
   ```
   
   This command automatically:
   - Downloads production environment variables from Vercel
   - Runs `drizzle-kit push` with production `DATABASE_URL`
   - Sets up your database tables and indexes

#### 4. Post-Deployment Verification

1. **Test Waitlist Signup:**
   ```bash
   curl -X POST https://yourapp.vercel.app/api/waitlist \
     -H "content-type: application/json" \
     -d '{"email":"test@example.com","source":"test"}'
   ```

2. **Check Email Delivery:**
   - Sign up with your email
   - Verify confirmation email arrives
   - Test confirmation link

3. **Database Verification:**
   ```bash
   # Check data was saved
   npm run db:studio
   # Or query directly in Neon console
   ```

### Alternative: Railway + PostgreSQL

#### 1. Railway Setup

1. **Create Railway Account:**
   - Sign up at [railway.app](https://railway.app)
   - Connect your GitHub repository

2. **Add PostgreSQL Service:**
   - In your Railway project, click "New Service"
   - Select "PostgreSQL"
   - Railway will provide connection details

3. **Configure Environment Variables:**
   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   NEXT_PUBLIC_SITE_URL=${{RAILWAY_PUBLIC_DOMAIN}}
   RESEND_API_KEY=re_your_api_key_here
   EMAIL_FROM=Your App <hello@yourdomain.com>
   ```

4. **Deploy and Test:**
   - Railway auto-deploys on git push
   - Run migrations: `npm run db:push`
   - Test the deployment

### Custom Domain Setup

#### Vercel Custom Domain

1. **Add Domain in Vercel:**
   - Go to Project → Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

2. **Update Environment Variables:**
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

3. **Update Email Configuration:**
   ```
   EMAIL_FROM=Your App <hello@yourdomain.com>
   ```

### Production Monitoring

#### Database Monitoring (Neon)
- Monitor connection limits in Neon dashboard
- Set up alerts for high usage
- Review query performance metrics

#### Email Monitoring (Resend)
- Track delivery rates in Resend dashboard
- Monitor bounce rates and spam reports
- Set up domain authentication (SPF, DKIM)

#### Application Monitoring (Vercel)
- Review function execution logs
- Monitor API response times
- Set up uptime monitoring

### Scaling Considerations

#### Database Scaling
- **Neon**: Automatically scales, monitor connection limits
- **Supabase**: Similar auto-scaling, good free tier
- **Vercel Postgres**: Integrated option with usage-based pricing

#### Rate Limiting
```env
# Add Redis for production rate limiting
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

#### Bot Protection
```env
# Add Turnstile for production bot protection
TURNSTILE_SECRET_KEY=your_turnstile_secret
```

### Deployment Checklist

- [x] Set production `NEXT_PUBLIC_SITE_URL`
- [x] Configure production database (Neon/Railway/Supabase)
- [x] Set up Resend API key and verify domain `RESEND_API_KEY`.
- [x] Configure custom domain (indie10k.com)
- [x] Add environment variables to hosting platform
- [ ] Run database migrations (`npm run db:push`)
- [o] Optional: Set up Turnstile bot protection
- [o] Optional: Set up Upstash Redis for rate limiting
- [ ] Test signup flow end-to-end
- [ ] Set up monitoring and alerts
- [ ] Configure proper error tracking
- [ ] Test email deliverability

## Monitoring

Key metrics to track:
- Signup conversion rate
- Email confirmation rate
- Rate limit hits
- Failed Turnstile verifications
- Database performance
- Email delivery rates

## Customization

**Email Template**: Edit `lib/email.ts` HTML content
**Validation Rules**: Modify `lib/validators.ts` schema
**Rate Limits**: Adjust limits in `lib/ratelimit.ts`
**Database Schema**: Update `lib/schema.ts` and migrate

## Troubleshooting

### Common Issues

1. **Database connection fails**: 
   - Check `DATABASE_URL` format in `.env.local`
   - Ensure `.env.local` file exists: `ls -la .env.local`
   - Ensure Docker container is running: `docker-compose ps`
   - Check database logs: `docker-compose logs postgres`
   - Try direct command: `DATABASE_URL="postgres://postgres:password@localhost:5432/indie10k" npx drizzle-kit push`

2. **Emails not sending**: 
   - Verify `RESEND_API_KEY` is set and valid
   - Check `EMAIL_FROM` domain is verified in Resend
   - Look for email errors in application logs

3. **Confirmations not working**: 
   - Check `NEXT_PUBLIC_SITE_URL` is correct
   - Verify confirmation emails contain correct domain
   - Test confirmation endpoint manually

4. **Rate limiting too aggressive**: 
   - Adjust limits in `lib/ratelimit.ts`
   - Disable Redis if not needed for development
   - Check Redis connection and logs

5. **Turnstile blocking valid users**: 
   - Check secret key configuration
   - Disable for development if not needed
   - Verify Turnstile domain settings

6. **Docker issues**:
   - Port 5432 already in use: Stop other PostgreSQL instances
   - Permission errors: Check Docker daemon is running
   - Data not persisting: Verify volumes are created

7. **Neon serverless warning**:
   - If you see "can only connect to remote instances" warning, this is normal
   - The app automatically uses `pg` driver for localhost connections
   - Only remote URLs (Neon/Vercel/Supabase) use the serverless driver

8. **Database does not exist**:
   - Stop and remove containers: `docker-compose down -v`
   - Start fresh: `docker-compose up -d postgres`
   - Check logs: `docker-compose logs postgres`
   - Verify database creation: `docker exec indie10k_postgres psql -U postgres -c "\l"`
   - If still missing, manually create using Node.js:
     ```bash
     node -e "const { Client } = require('pg'); const client = new Client('postgres://postgres:password@localhost:5432/postgres'); client.connect().then(() => client.query('CREATE DATABASE indie10k')).then(() => console.log('Database created')).catch(err => console.log('Database exists or error:', err.message)).finally(() => client.end());"
     ```
   - Alternative: `docker exec indie10k_postgres psql -U postgres -c "CREATE DATABASE indie10k;"`

### Database Management

**Connect to database:**
```bash
# Using psql
docker exec -it indie10k_postgres psql -U postgres -d indie10k

# Using pgAdmin (if enabled)
# Visit http://localhost:5050
```

**Reset database:**
```bash
# Remove all data and restart fresh
docker-compose down -v
docker-compose up -d postgres

# Wait for database to be ready
docker-compose logs -f postgres
# Look for "database system is ready to accept connections"

# Verify database exists
docker exec -it indie10k_postgres psql -U postgres -c "\l"

# Push schema
npm run db:push
```

### Debug Mode

Add logging to troubleshoot issues:

```typescript
// In API routes
console.log('Request data:', { email, source, referrer })
console.log('Database result:', result)
console.log('Email sent:', emailResult)
```

### Health Checks

```bash
# Check if database is responding
docker-compose exec postgres pg_isready -U postgres -d indie10k

# Check if services are healthy
docker-compose ps

# View all logs
docker-compose logs -f
```