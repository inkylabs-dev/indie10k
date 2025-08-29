import { NextRequest, NextResponse } from 'next/server';
import { getDb, schema } from '@/lib/db';
import { WaitlistInput } from '@/lib/validators';
import { normalizeEmail } from '@/lib/schema';
import { sendWaitlistConfirm } from '@/lib/email';
import { verifyTurnstile } from '@/lib/turnstile';
import { limit } from '@/lib/ratelimit';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = WaitlistInput.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input data' },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const normalizedEmail = normalizeEmail(data.email);
    
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';
    const rateLimitKey = `waitlist:${clientIP}:${normalizedEmail}`;
    
    const rateLimitResult = await limit(rateLimitKey);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Verify Turnstile if token provided
    const turnstileValid = await verifyTurnstile(data.turnstileToken);
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Invalid captcha token' },
        { status: 400 }
      );
    }

    // Generate secure confirmation token
    const confirmToken = crypto.randomBytes(24).toString('hex');
    
    // Upsert into database
    const db = getDb();
    await db.insert(schema.waitlist)
      .values({
        email: normalizedEmail,
        name: data.name,
        source: data.source,
        utm: data.utm,
        referrer: data.referrer,
        confirmToken,
      })
      .onConflictDoUpdate({
        target: schema.waitlist.email,
        set: {
          name: data.name,
          source: data.source,
          utm: data.utm,
          referrer: data.referrer,
          confirmToken,
        },
      });

    // Send confirmation email
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000';
    const confirmUrl = `${siteUrl}/waitlist/confirm?token=${confirmToken}&email=${encodeURIComponent(normalizedEmail)}`;
    
    await sendWaitlistConfirm(normalizedEmail, confirmUrl);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}