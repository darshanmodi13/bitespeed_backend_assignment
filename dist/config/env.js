"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODE_ENV = exports.DATABASE_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}` });
_a = process.env, exports.PORT = _a.PORT, exports.DATABASE_URI = _a.DATABASE_URI, exports.NODE_ENV = _a.NODE_ENV;
//# sourceMappingURL=env.js.map