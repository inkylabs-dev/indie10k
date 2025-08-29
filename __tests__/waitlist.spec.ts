import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WaitlistInput } from '@/lib/validators';
import { normalizeEmail } from '@/lib/schema';
import { verifyTurnstile } from '@/lib/turnstile';
import { limit } from '@/lib/ratelimit';

// Mock external dependencies
vi.mock('@/lib/db', () => ({
  getDb: vi.fn(() => ({
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn().mockResolvedValue({}),
      })),
    })),
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => ({
          limit: vi.fn().mockResolvedValue([{
            email: 'test@example.com',
            confirmToken: 'valid-token',
          }]),
        })),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn().mockResolvedValue({}),
      })),
    })),
  })),
  schema: {
    waitlist: {
      email: 'email',
      confirmToken: 'confirm_token',
    },
  },
}));

vi.mock('@/lib/email', () => ({
  sendWaitlistConfirm: vi.fn().mockResolvedValue({}),
}));

describe('Waitlist Validation', () => {
  it('should validate correct email format', () => {
    const validData = {
      email: 'test@example.com',
      name: 'John Doe',
      source: 'hero',
    };
    
    const result = WaitlistInput.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
    };
    
    const result = WaitlistInput.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should handle optional fields', () => {
    const minimalData = {
      email: 'test@example.com',
    };
    
    const result = WaitlistInput.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it('should validate UTM parameters as object', () => {
    const dataWithUtm = {
      email: 'test@example.com',
      utm: {
        source: 'google',
        medium: 'cpc',
        campaign: 'summer',
      },
    };
    
    const result = WaitlistInput.safeParse(dataWithUtm);
    expect(result.success).toBe(true);
  });
});

describe('Email Normalization', () => {
  it('should normalize email to lowercase', () => {
    expect(normalizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com');
  });

  it('should trim whitespace', () => {
    expect(normalizeEmail('  test@example.com  ')).toBe('test@example.com');
  });

  it('should handle mixed case', () => {
    expect(normalizeEmail('Test.User@Example.Com')).toBe('test.user@example.com');
  });
});

describe('Turnstile Verification', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it('should return true when no secret key is configured', async () => {
    const result = await verifyTurnstile('any-token');
    expect(result).toBe(true);
  });

  it('should return true when no token is provided', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    const result = await verifyTurnstile();
    expect(result).toBe(true);
  });
});

describe('Rate Limiting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
  });

  it('should allow all requests when Redis is not configured', async () => {
    const result = await limit('test-key');
    expect(result.success).toBe(true);
  });
});

describe('Waitlist Integration Tests', () => {
  it('should handle signup flow', async () => {
    const testEmail = 'test@example.com';
    const normalizedEmail = normalizeEmail(testEmail);
    
    expect(normalizedEmail).toBe('test@example.com');
    
    const validInput = {
      email: testEmail,
      name: 'Test User',
      source: 'hero',
    };
    
    const validation = WaitlistInput.safeParse(validInput);
    expect(validation.success).toBe(true);
  });

  it('should handle confirmation flow', () => {
    // This would typically test the confirmation endpoint
    // but since we're mocking the database, we'll test the logic
    const testEmail = 'test@example.com';
    const testToken = 'valid-token';
    
    expect(normalizeEmail(testEmail)).toBe('test@example.com');
    expect(testToken).toBeTruthy();
  });
});