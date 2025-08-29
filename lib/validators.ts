import { z } from 'zod';

export const WaitlistInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(80).optional(),
  source: z.string().max(64).optional(),
  utm: z.record(z.string()).optional(),
  referrer: z.string().url().optional(),
  turnstileToken: z.string().optional()
});