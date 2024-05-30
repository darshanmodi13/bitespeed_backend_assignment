"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const env_1 = require("./env");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: 'postgresql',
    dbCredentials: {
        url: env_1.DATABASE_URI,
    },
    schema: './src/db/**/*schema.ts',
    out: './migrations',
});
//# sourceMappingURL=drizzle.config.js.map