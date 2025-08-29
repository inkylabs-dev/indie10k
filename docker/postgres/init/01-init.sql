-- This script runs after the main database is created by POSTGRES_DB
-- Connect to the indie10k database (should already exist from POSTGRES_DB)
\c indie10k;

-- Create extensions if needed
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Grant permissions (postgres user already has all privileges)
-- GRANT ALL PRIVILEGES ON DATABASE indie10k TO postgres;