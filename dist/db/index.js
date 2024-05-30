"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const neon_http_1 = require("drizzle-orm/neon-http");
const serverless_1 = require("@neondatabase/serverless");
const env_1 = require("../config/env");
const sql = (0, serverless_1.neon)(env_1.DATABASE_URI);
exports.db = (0, neon_http_1.drizzle)(sql);
//# sourceMappingURL=index.js.map