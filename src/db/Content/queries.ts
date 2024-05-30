import { db } from '@db/index';
import { IInsertContent, contentTable } from './schema';
import { and, asc, eq, isNull, ne, or } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import e from 'express';

export async function createContent(data: Partial<IInsertContent>) {
	return db
		.insert(contentTable)
		.values(data as IInsertContent)
		.returning();
}

export async function createContentIfNew(id: number, email?: string | null, phoneNumber?: string | null) {
	let emailQuery = null;
	if (email) {
		emailQuery = await db.select().from(contentTable).where(eq(contentTable.email, email));
	}

	let phoneQuery = null;
	if (phoneNumber) {
		phoneQuery = await db.select().from(contentTable).where(eq(contentTable.phoneNumber, phoneNumber));
	}

	if ((email && (!emailQuery || emailQuery.length == 0)) || (phoneNumber && (!phoneQuery || phoneQuery.length == 0))) {
		return createContent({ email, phoneNumber, linkedId: id, linkPrecedence: 'secondary' });
	}

	return null;
}

export async function findPrimayLinkPrecendence(email?: string | null, phoneNumber?: string | null) {
	const conditions = [];
	if (email) {
		conditions.push(eq(contentTable.email, email));
	}

	if (phoneNumber) {
		conditions.push(eq(contentTable.phoneNumber, phoneNumber));
	}

	return db
		.select()
		.from(contentTable)
		.where(and(or(...conditions), isNull(contentTable.deletedAt)))
		.orderBy(asc(contentTable.createdAt))
		.limit(1);
}

export async function findAndUpdateSecondaryLinkPrecedence(id: number, email?: string | null, phoneNumber?: string | null) {
	const conditions = [];
	if (email) {
		conditions.push(eq(contentTable.email, email));
	}

	if (phoneNumber) {
		conditions.push(eq(contentTable.phoneNumber, phoneNumber));
	}
	return db
		.update(contentTable)
		.set({ linkedId: id, linkPrecedence: 'secondary' })
		.where(and(or(...conditions), eq(contentTable.linkPrecedence, 'primary'), isNull(contentTable.deletedAt), ne(contentTable.id, id)))
		.returning();
}

export async function findRecords(email?: string | null, phoneNumber?: string | null) {
	const conditions = [];
	const parentContentTable = alias(contentTable, 'parentContentTable');
	if (email) {
		conditions.push(eq(parentContentTable.email, email));
		conditions.push(eq(contentTable.email, email));
	}

	if (phoneNumber) {
		conditions.push(eq(parentContentTable.phoneNumber, phoneNumber));
		conditions.push(eq(contentTable.phoneNumber, phoneNumber));
	}

	return db
		.select()
		.from(parentContentTable)
		.fullJoin(contentTable, eq(parentContentTable.id, contentTable.linkedId))
		.where(and(or(...conditions), and(eq(parentContentTable.linkPrecedence, 'primary'), isNull(parentContentTable.linkedId))));
}
