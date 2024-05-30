import { index, integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const linkPrecedenceEnum = pgEnum('linkPrecedence', ['primary', 'secondary']);
const contentTableSchema = {
	id: serial('id').primaryKey(),
	phoneNumber: text('phoneNumber'),
	email: text('email'),
	linkedId: integer('linkedId'),
	linkPrecedence: linkPrecedenceEnum('linkPrecedence').default('primary'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp('deletedAt'),
};

export const contentTable = pgTable('Content', contentTableSchema, (table) => {
	return {
		emailIdx: index('name_idx').on(table.email),
		phoneNumberIdx: index('email_idx').on(table.phoneNumber),
	};
});
contentTableSchema.linkedId.references(() => contentTable.id, { onDelete: 'cascade' });

export type IInsertContent = typeof contentTable.$inferInsert;
export type TSelectContent = typeof contentTable.$inferSelect;
