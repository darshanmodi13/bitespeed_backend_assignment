import { defineConfig } from 'drizzle-kit';
import { DATABASE_URI } from './env';

export default defineConfig({
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URI!,
	},
	schema: './src/db/**/*schema.ts',
	out: './migrations',
});
