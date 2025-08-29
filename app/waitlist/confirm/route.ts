import { NextRequest, NextResponse } from 'next/server';
import { getDb, schema } from '@/lib/db';
import { normalizeEmail } from '@/lib/schema';
import { eq, and, isNotNull } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.redirect(new URL('/?status=invalid', request.url));
    }

    const normalizedEmail = normalizeEmail(email);
    const db = getDb();

    // Find waitlist entry by email
    const waitlistEntry = await db.select()
      .from(schema.waitlist)
      .where(eq(schema.waitlist.email, normalizedEmail))
      .limit(1);

    if (waitlistEntry.length === 0 || 
        waitlistEntry[0].confirmToken !== token || 
        !waitlistEntry[0].confirmToken) {
      return NextResponse.redirect(new URL('/?status=invalid', request.url));
    }

    // Update confirmation status
    await db.update(schema.waitlist)
      .set({
        confirmedAt: new Date(),
        confirmToken: null,
      })
      .where(eq(schema.waitlist.email, normalizedEmail));

    return NextResponse.redirect(new URL('/?status=confirmed', request.url));

  } catch (error) {
    console.error('Email confirmation error:', error);
    return NextResponse.redirect(new URL('/?status=invalid', request.url));
  }
}