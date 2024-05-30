"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentTable = exports.linkPrecedenceEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.linkPrecedenceEnum = (0, pg_core_1.pgEnum)('linkPrecedence', ['primary', 'secondary']);
const contentTableSchema = {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    phoneNumber: (0, pg_core_1.text)('phoneNumber'),
    email: (0, pg_core_1.text)('email'),
    linkedId: (0, pg_core_1.integer)('linkedId'),
    linkPrecedence: (0, exports.linkPrecedenceEnum)('linkPrecedence').default('primary'),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
        .notNull()
        .$onUpdate(() => new Date()),
    deletedAt: (0, pg_core_1.timestamp)('deletedAt'),
};
exports.contentTable = (0, pg_core_1.pgTable)('Content', contentTableSchema, (table) => {
    return {
        emailIdx: (0, pg_core_1.index)('name_idx').on(table.email),
        phoneNumberIdx: (0, pg_core_1.index)('email_idx').on(table.phoneNumber),
    };
});
contentTableSchema.linkedId.references(() => exports.contentTable.id, { onDelete: 'cascade' });
//# sourceMappingURL=schema.js.map