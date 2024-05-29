import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { PORT, DATABASE_URI, NODE_ENV } = process.env;
