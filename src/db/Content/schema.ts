import { integer, pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const linkPrecedenceEnum = pgEnum('linkPrecedence', ['primary', 'secondary']);
const contentTableSchema = {
	id: serial('id').primaryKey(),
	phoneNumber: text('phoneNumber'),
	email: text('email').notNull(),
	linkedId: integer('linkedId'),
	linkPrecedence: linkPrecedenceEnum('linkPrecedence'),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt')
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp('deletedAt').$onUpdate(() => new Date()),
};

export const contentTable = pgTable('Content', contentTableSchema);
contentTableSchema.linkedId.references(() => contentTable.id, { onDelete: 'cascade' });

export type InsertPost = typeof contentTable.$inferInsert;
export type SelectPost = typeof contentTable.$inferSelect;
