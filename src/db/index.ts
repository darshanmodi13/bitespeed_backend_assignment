import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { DATABASE_URI } from '@/config/env';

const sql = neon(DATABASE_URI!);
export const db = drizzle(sql);
