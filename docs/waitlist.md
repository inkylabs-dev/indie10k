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

### lib/schema.ts
- Drizzle ORM schema definition
- Email normalization helper
- Database indexes

### lib/validators.ts
- Zod validation schemas
- Input sanitization
- Type safety

### lib/email.ts
- Resend email integration
- HTML email templates
- Error handling

### lib/turnstile.ts
- Optional Cloudflare Turnstile verification
- Graceful degradation when not configured
- API integration

### lib/ratelimit.ts
- Optional Upstash Redis rate limiting
- 5 requests per minute per IP+email
- Fail-open design

### lib/db.ts
- Neon serverless database connection
- Connection pooling
- Schema export

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

1. **Install Dependencies:**
   ```bash
   npm install drizzle-orm @neondatabase/serverless zod resend
   npm install -D drizzle-kit vitest
   ```

2. **Environment Setup:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Database Migration:**
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

4. **Development:**
   ```bash
   npm run dev
   npm run test
   ```

## Testing Locally

**API Test:**
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "content-type: application/json" \
  -d '{"email":"you@example.com","source":"hero"}'
```

**Confirmation Test:**
1. Check your email for confirmation link
2. Click link or visit manually
3. Verify redirect to `/?status=confirmed`

## Deployment Checklist

- [ ] Set production `NEXT_PUBLIC_SITE_URL`
- [ ] Configure production database
- [ ] Set up Resend API key
- [ ] Configure email domain/sender
- [ ] Optional: Set up Turnstile keys
- [ ] Optional: Set up Upstash Redis
- [ ] Run database migrations
- [ ] Test signup flow end-to-end

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

**Common Issues:**
1. **Database connection fails**: Check `DATABASE_URL` format
2. **Emails not sending**: Verify `RESEND_API_KEY` and `EMAIL_FROM`
3. **Confirmations not working**: Check `NEXT_PUBLIC_SITE_URL` is correct
4. **Rate limiting too aggressive**: Adjust Redis limits or disable
5. **Turnstile blocking valid users**: Check secret key or disable

**Debug Mode**: Add `console.log` statements in API routes for debugging.