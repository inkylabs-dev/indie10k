// Fixed reference date for mock rendering to avoid SSR/CSR drift
export const MOCK_NOW = new Date('2025-08-28T00:00:00Z');

// Simple deterministic pseudo-random generator for mock data
export function prng(seed: number) {
  // Mulberry32 variant
  let t = (seed + 0x6D2B79F5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), 1 | t);
  t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

