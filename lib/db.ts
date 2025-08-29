import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { Pool } from 'pg';
import { Pool as NeonPool } from '@neondatabase/serverless';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | ReturnType<typeof drizzleNeon>;

export function getDb() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    
    // Use regular pg for local development, neon-serverless for production
    if (connectionString.includes('localhost') || connectionString.includes('127.0.0.1')) {
      // Local PostgreSQL connection
      const pool = new Pool({ connectionString });
      db = drizzle(pool, { schema });
    } else {
      // Remote serverless connection (Neon, Vercel, Supabase)
      const pool = new NeonPool({ connectionString });
      db = drizzleNeon(pool, { schema });
    }
  }
  
  return db;
}

export { schema };