"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = __importDefault(require("./utils/envalid"));
require("reflect-metadata");
const app_1 = require("./app");
(0, envalid_1.default)();
const app = new app_1.App();
app.listen();
//# sourceMappingURL=server.js.map