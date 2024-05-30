"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentBodyAttr = void 0;
const zod_1 = require("zod");
exports.ContentBodyAttr = zod_1.z
    .object({
    email: zod_1.z.string().optional().nullable(),
    phoneNumber: zod_1.z.string().optional().nullable(),
})
    .strict()
    .refine((data) => data.email != null || data.phoneNumber != null, {
    message: 'Please provide email or phone number',
    path: ['email', 'phoneNumber'],
});
//# sourceMappingURL=content.type.js.map