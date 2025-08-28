import { NextRequest } from 'next/server';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages = [] } = await req.json().catch(() => ({ messages: [] }));

  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Missing OPENAI_API_KEY. Add it to .env.local' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    messages,
    temperature: 0.7,
    system:
      "You are Indie10k Coach, an upbeat, practical assistant for indie hackers. Provide specific, actionable advice tied to growth, marketing, and product. Keep answers concise with bullet points and next steps when helpful.",
  });

  return result.toUIMessageStreamResponse();
}
