interface RateLimitResult {
  success: boolean;
}

export async function limit(key: string): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // If no Redis configuration, allow all requests
  if (!redisUrl || !redisToken) {
    return { success: true };
  }

  try {
    // Use Upstash Redis REST API for rate limiting
    // Allow 5 requests per minute per key
    const pipeline = [
      ['INCR', key],
      ['EXPIRE', key, 60], // 60 seconds TTL
    ];

    const response = await fetch(`${redisUrl}/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pipeline),
    });

    if (!response.ok) {
      console.error('Redis request failed:', response.statusText);
      return { success: true }; // Fail open
    }

    const results = await response.json();
    const count = results[0]?.result || 0;

    return { success: count <= 5 };
  } catch (error) {
    console.error('Rate limit error:', error);
    return { success: true }; // Fail open
  }
}