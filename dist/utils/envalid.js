"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({ default: 'development' }),
        PORT: (0, envalid_1.port)({ default: 8989 }),
        DATABASE_URI: (0, envalid_1.str)(),
    });
};
exports.default = validateEnv;
//# sourceMappingURL=envalid.js.map